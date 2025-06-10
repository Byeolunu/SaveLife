from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import User, Campaign, Donation
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, CampaignSerializer, DonationSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile,InspiringStories,NewsletterSubscription
from .serializers import StoriesSerializer,NewsletterSubscriptionSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import serializers
from rest_framework.permissions import AllowAny,IsAuthenticatedOrReadOnly
from rest_framework.generics import ListAPIView
from django.utils.crypto import get_random_string
from django.http import HttpResponse


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


User = get_user_model()

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny] 

class UserDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]  

    def delete(self, request, pk, format=None):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class CampaignListView(ListAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  

    def get_queryset(self):
        queryset = Campaign.objects.filter(is_active=True)
        title = self.request.query_params.get('title', None)
        is_active = self.request.query_params.get('is_active', None)
        goal_min = self.request.query_params.get('goal_min', None)
        goal_max = self.request.query_params.get('goal_max', None)

        if title:
            queryset = queryset.filter(title__icontains=title)
        if is_active:
            queryset = queryset.filter(is_active=(is_active.lower() == 'true'))
        if goal_min:
            queryset = queryset.filter(goal__gte=goal_min)
        if goal_max:
            queryset = queryset.filter(goal__lte=goal_max)

        return queryset
    def perform_create(self, serializer):
        if self.request.user.user_type == 'org':
            serializer.save(created_by=self.request.user,is_active=True)
        else:
            raise permissions.PermissionDenied("Only organizations can create campaigns")

class CampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        if serializer.instance.created_by == self.request.user:
            serializer.save()
        else:
            raise permissions.PermissionDenied("You can only update your own campaigns")

    def perform_destroy(self, instance):
        if instance.created_by == self.request.user:
            instance.is_active = False
            instance.save()
        else:
            raise permissions.PermissionDenied("You can only delete your own campaigns")

class DonationListView(generics.ListCreateAPIView):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'org':
            campaigns = Campaign.objects.filter(created_by=user)
            return Donation.objects.filter(campaign__in=campaigns)
        return Donation.objects.filter(donor=user)

    def perform_create(self, serializer):
        campaign = serializer.validated_data['campaign']
        if not campaign.is_active:
            raise serializers.ValidationError("This campaign is no longer active")
        serializer.save(donor=self.request.user)

class DonationDetailView(generics.RetrieveAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self):
        donation = super().get_object()
        user = self.request.user
        if donation.donor != user and donation.campaign.created_by != user:
            raise permissions.PermissionDenied("You don't have permission to view this donation")
        return donation

class UserCampaignsView(generics.ListAPIView):
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'org':
            return Campaign.objects.filter(created_by=user)
        return Campaign.objects.none()

@api_view(['POST'])
def create_campaign(request):
    if not hasattr(request.user, 'user_type') or request.user.user_type != 'org':
        return Response({"error": "Only organizations can create campaigns."}, status=status.HTTP_403_FORBIDDEN)

    serializer = CampaignSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_profile(request):
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required."}, status=401)

    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def send_password_reset_email(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        if not hasattr(user, 'profile'):
            Profile.objects.create(user=user)

        reset_token = get_random_string(length=32)  
        user.profile.reset_token = reset_token  
        user.profile.save()

        return Response({
            "message": "Password reset link generated.",
            "reset_link": f"/reset-password?token={reset_token}" 
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def reset_password(request):
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    if not token or not new_password:
        return Response({"error": "Token and new password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        profile = Profile.objects.get(reset_token=token)
        user = profile.user

        user.password = make_password(new_password)
        user.save()

        profile.reset_token = None
        profile.save()

        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)
    except Profile.DoesNotExist:
        return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def home_data(request):
    data = {
        "welcome_message": "Welcome to SaveLife",
        "subtitle": "Here to share happiness, kindness, and support.",
        "featured_campaigns": [
            {"id": 1, "title": "Campaign 1", "description": "Help us with Campaign 1"},
            {"id": 2, "title": "Campaign 2", "description": "Support Campaign 2"},
        ],
    }
    return Response(data)

class ContactCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({"message": "Contact created successfully"}, status=status.HTTP_201_CREATED)

class InspiringStoriesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=InspiringStories.objects.all()
    serializer_class=StoriesSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
            if self.request.user != serializer.instance.created_by:
                raise permissions.PermissionDenied("You can only update your own stories.")
            serializer.save()
        
    def perform_destroy(self, instance):
        if instance.created_by == self.request.user:
            instance.delete()
        else:
            raise permissions.PermissionDenied("You can only delete your own stories")
        
class InspiringListView(generics.ListCreateAPIView):
    queryset = InspiringStories.objects.all()
    serializer_class = StoriesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
class NewsletterSubscriptionAPIView(generics.CreateAPIView):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer
    permission_classes = [AllowAny]

def home_view(request):
    return HttpResponse("<h1>Welcome to SaveLife</h1>")

@api_view(['POST'])
def change_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')

    if not check_password(current_password, user.password):
        return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_campaign(request, pk):
    try:
        campaign = Campaign.objects.get(pk=pk)
        if campaign.created_by != request.user:
            return Response({"error": "You can only delete your own campaigns."}, status=status.HTTP_403_FORBIDDEN)
        
        campaign.delete()
        return Response({"message": "Campaign deleted successfully."}, status=status.HTTP_200_OK)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found."}, status=status.HTTP_404_NOT_FOUND)








































