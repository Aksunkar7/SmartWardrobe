from django.urls import path
from .views import OutfitListView, OutfitDetailView, GenerateOutfitView, RecommendView, TaskStatusView
urlpatterns = [
    path('', OutfitListView.as_view()),
    path('<int:pk>/', OutfitDetailView.as_view()),
    path('generate/', GenerateOutfitView.as_view()),
    path('recommend/', RecommendView.as_view()),
    path('tasks/<str:task_id>/status/', TaskStatusView.as_view()),
]
