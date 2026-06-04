from rest_framework.serializers import ModelSerializer
from .models import Outfit

class OutfitSerializer(ModelSerializer):
    class Meta:
        model = Outfit
        fields = '__all__'