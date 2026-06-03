from django.urls import path

from .views import WardrobeListView, WardrobeDetailView

urlpatterns = [
    path('', WardrobeListView.as_view()),
    path('<int:id>', WardrobeDetailView.as_view())
]