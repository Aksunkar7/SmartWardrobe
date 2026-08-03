from celery import shared_task
from django.core.cache import cache
from wardrobe.models import WardrobeItem
from .anthropic_service import get_outfit_recommendation

@shared_task(bind=True)
def generate_recommendation_task(self, user_id):
    wardrobe_items = WardrobeItem.objects.filter(user_id=user_id)
    recommendation = get_outfit_recommendation(wardrobe_items)
    
    cache_key = f"ai_recommendation:user:{user_id}"
    cache.set(cache_key, recommendation, timeout=3600)
    
    return recommendation