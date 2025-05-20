
from django.urls import path
from .views import (
    CustomTokenObtainPairView, UserRegistrationView, UserProfileView,
    CampaignListView, CampaignDetailView, DonationListView, DonationDetailView,
    UserCampaignsView, UserListView, UserDeleteView, home_data, user_profile,
    logout_view, send_password_reset_email, ContactCreateAPIView,
    NewsletterSubscriptionAPIView, reset_password, create_campaign,InspiringListView,InspiringStoriesDetailView, change_password,
    update_settings, get_campaign_progress, get_settings
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('campaigns/', CampaignListView.as_view(), name='get_campaigns'),
    path('campaigns/<int:pk>/', CampaignDetailView.as_view(), name='campaign-detail'),
    path('my-campaigns/', UserCampaignsView.as_view(), name='user-campaigns'),
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('api/profile/', user_profile, name='user-profile'),
    path('logout/', logout_view, name="logout_view"),
    path('password-reset/', send_password_reset_email, name='password-reset-email'),
    path('reset-password/', reset_password, name='reset-password'),
    path('change-password/', change_password, name='change-password'),
    path('donations/', DonationListView.as_view(), name='donation-list'),
    path('donations/<int:pk>/', DonationDetailView.as_view(), name='donation-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('campaigns/create/', create_campaign, name='create_campaign'),
    path('api/home/', home_data, name='home-data'),
    path('submit/', ContactCreateAPIView.as_view(), name='contact-submit'),
    path('newsletter/subscribe/', NewsletterSubscriptionAPIView.as_view(), name='newsletter-subscribe'),
    path('inspiring-stories/<int:pk>/',InspiringStoriesDetailView.as_view(),name='inspiring-stories-detail'),
    path('inspiring-stories/', InspiringListView.as_view(), name='inspiring-stories-list'),
    path('settings/', get_settings, name='get-settings'),
    path('settings/update/', update_settings, name='update-settings'),
    path('settings/campaign-progress/', get_campaign_progress, name='campaign-progress'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

