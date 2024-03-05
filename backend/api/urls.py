from django.contrib import admin
from .views import AskGptView, GeolocationView
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ask-gpt', AskGptView.as_view()),
    path('places', GeolocationView.as_view(), name='places'),
]
