from django.contrib import admin
from .views import AskGptView
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ask-gpt', AskGptView.as_view()),
]
