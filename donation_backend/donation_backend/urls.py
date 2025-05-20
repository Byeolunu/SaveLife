from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("<h1>Welcome to SaveLife API</h1>")

urlpatterns = [
    path('', home_view, name='home'),  
    path('admin/', admin.site.urls),
    path('api/', include('donations.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



