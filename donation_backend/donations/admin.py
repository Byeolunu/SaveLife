from django.contrib import admin
from .models import User, Campaign, ContactSubmission, Donation, Profile, InspiringStories, NewsletterSubscription

class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'goal', 'start_date', 'is_active')
    list_filter = ('is_active', 'start_date')
    search_fields = ('title', 'description')

class DonationAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'donor', 'amount', 'donation_date')
    list_filter = ('donation_date',)
    search_fields = ('campaign__title', 'donor__username')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'reset_token')

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type', 'is_active')
    search_fields = ('username', 'email')

class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')

class InspiringStoriesAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by')
    search_fields = ('name', 'description')

@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at']    

# Register all models
admin.site.register(User, UserAdmin)
admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Donation, DonationAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(ContactSubmission, ContactSubmissionAdmin)
admin.site.register(InspiringStories, InspiringStoriesAdmin)
