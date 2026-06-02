from django.db import models
from django.contrib.auth.models import User

class WardrobeItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
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
        null=True
        )
    
    def __str__(self):
        return self.name