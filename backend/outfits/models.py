from django.db import models
from django.contrib.auth.models import User

from wardrobe.models import WardrobeItem

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    outfit_items = models.ManyToManyField(WardrobeItem)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

