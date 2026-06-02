from django.db import models
from django.contrib.auth.models import User

from wardrobe.models import WardrobeItem

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class OutfitItem(models.Model):
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
    wardrobe_item = models.ForeignKey(WardrobeItem, on_delete=models.CASCADE)
    
