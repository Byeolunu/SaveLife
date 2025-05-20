from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.core.validators import MinValueValidator
from django.db.models import Sum
from django.utils.timezone import now

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('user', 'Regular User'),
        ('org', 'Organization'),
        ('anon', 'Anonymous'),
    )
    
    user_type = models.CharField(max_length=4, choices=USER_TYPE_CHOICES, default='user')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.username
    


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    reset_token = models.CharField(max_length=64, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"



class Campaign(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    goal = models.DecimalField(max_digits=10, decimal_places=2)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateTimeField(default=now)
    is_active = models.BooleanField(default=True)
    ends_date = models.DateTimeField()
    image = models.ImageField(upload_to='campaign_images/', blank=True, null=True)

    def update_active(self):
        """
        Update `is_active` based on current time and valid date logic.
        Campaigns with ends_date earlier than start_date or equal to it are marked inactive.
        """
        current_time = now()
        if self.ends_date <= self.start_date:
            return False
        elif self.start_date <= current_time <= self.ends_date:
            return True
        else:
            return False

    def save(self, *args, **kwargs):
        """
        Override the save method to ensure `is_active` is updated automatically.
        """
        self.is_active = self.update_active()  
        super().save(*args, **kwargs)

    @property
    def current_amount(self):
        """
        Calculate the total donations for this campaign.
        """
        return self.donations_received.aggregate(total=Sum('amount'))['total'] or 0

    def __str__(self):
        return self.title

class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='donations_made')
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='donations_received')
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    donation_date = models.DateTimeField(auto_now_add=True)
    is_anonymous = models.BooleanField(default=False)
    message = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.amount} donated to {self.campaign.title}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission from {self.name}"    

class InspiringStories(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(max_length=2000)
    image=models.ImageField(upload_to="insp/", blank=True ,null=True)
    created_by=models.ForeignKey(User,on_delete=models.CASCADE, related_name='inspstories')

    def __str__(self):
        return f"created by {self.created_by}"
    
class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
