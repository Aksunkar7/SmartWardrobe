from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache

from .models import WardrobeItem

@receiver(post_save, sender=WardrobeItem)
@receiver(post_delete, sender=WardrobeItem)

def invalidate_recommendation_cache(sender, instance, **kwargs):
    cache.delete(f"ai_recommendation:user:{instance.user_id}")