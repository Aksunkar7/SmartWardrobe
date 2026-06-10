from django.db import models
from django.contrib.auth.models import User

from wardrobe.models import WardrobeItem

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    items = models.ManyToManyField(WardrobeItem, related_name='outfits')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return str(self.name)

