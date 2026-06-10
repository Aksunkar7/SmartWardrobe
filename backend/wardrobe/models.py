from django.db import models
from django.contrib.auth.models import User

class WardrobeItem(models.Model):
    CATEGORY_CHOICES = [
        ("top", "Top"),
        ("bottom", "Bottom"),
        ("shoes", "Shoes"),
        ("accessory", "Accessory"),
    ]
    
    SEASON_CHOICES = [
        ("summer", "Summer"),
        ("winter", "Winter"),
        ("autumn", "Autumn"),
        ("spring", "Spring"),
    ]
      
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        )
    color = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(
        upload_to='wardrobe/',
        blank=True, # can be empty
        null=True # can be null
    )
    season = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=SEASON_CHOICES,
        )
    
    def __str__(self):
        return self.name