from django.urls import path

from .views import WardrobeListView

urlpatterns = [
    path('', WardrobeListView.as_view()) 
]