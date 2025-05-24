from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Campaign, Donation ,InspiringStories
from .models import ContactSubmission , NewsletterSubscription

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'user_type', 'first_name', 'last_name', 'phone_number', 'address','description']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

    
class StoriesSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    class Meta:
        model = InspiringStories
        fields = '__all__'
        read_only_fields = ['created_by'] 

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if "@" in username:
            try:
                user = User.objects.get(email=username)
                attrs["username"] = user.username
            except User.DoesNotExist:
                pass

        return super().validate(attrs)
    


class CampaignSerializer(serializers.ModelSerializer):
    current_amount = serializers.ReadOnlyField()
    created_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = '__all__'
        read_only_fields = ['created_by']
        
    def get_created_by_name(self, obj):
        return obj.created_by.username  



class DonationSerializer(serializers.ModelSerializer):
    campaign_current_amount = serializers.SerializerMethodField()

    class Meta:
        model = Donation
        fields = ['id', 'amount', 'is_anonymous', 'message', 'campaign', 'campaign_current_amount']

    def get_campaign_current_amount(self, obj):
        return obj.campaign.current_amount

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['donor'] = request.user
        return super().create(validated_data)




class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'        
    def validate_email(self, value):
        if "@" not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['email']


