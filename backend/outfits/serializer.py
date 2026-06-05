from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import WardrobeItem
from wardrobe.serializers import WardrobeItemSerializer
from .models import Outfit


# гет запрос алған кезде барлық информация береді вложенный список болса
class OutfitReadSerializer(ModelSerializer):
    # Override жасаймыз модельдің полясына
    items = WardrobeItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Outfit
        fields = '__all__'
        
# Пост запрос жасаған кезде только айди элемента жаза саламыз, что удобно не пишем каждое поле item's
# то есть принимаем айди и превращаем на объекты по айди, чтобы было удобно при чтении, а написать айди при пост
class OutfitWriteSerializer(ModelSerializer):
    items = PrimaryKeyRelatedField(queryset=WardrobeItem.objects.all(), many=True)
    class  Meta:
        model = Outfit
        fields = '__all__'
        