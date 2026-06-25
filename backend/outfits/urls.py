from django.urls import path
from .views import OutfitListView, OutfitDetailView, GenerateOutfitView, RecommendView
urlpatterns = [
    path('', OutfitListView.as_view()),
    path('<int:pk>/', OutfitDetailView.as_view()),
    path('generate/', GenerateOutfitView.as_view()),
    path('recommend/', RecommendView.as_view()),
]
