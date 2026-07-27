from rest_framework.views import APIView
from .models import Outfit
from .serializer import OutfitReadSerializer, OutfitWriteSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from wardrobe.models import WardrobeItem
import random
class OutfitListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        items = Outfit.objects.all()
        serializer = OutfitReadSerializer(items, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = OutfitWriteSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OutfitDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self, request, pk):
        # Outfit.objects.get(PK=PK)
        return get_object_or_404(
                Outfit,
                pk=pk,
                user=request.user,
            )
    
    def get(self, request, pk):
        item = self.get_object(request, pk)
        serializer = OutfitReadSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        item = self.get_object(request, pk)
        serializer = OutfitWriteSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        item = self.get_object(request, pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class GenerateOutfitView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        items = WardrobeItem.objects.filter(user=request.user)
        tops = items.filter(category='top')
        bottoms = items.filter(category='bottom')
        shoes = items.filter(category='shoes')
        accessories = items.filter(category='accessory')
        
        if not tops.exists():
            return Response(
                {'error': 'No tops found'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not bottoms.exists():
            return Response(
                {'error': 'No bootoms found'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not shoes.exists():
            return Response(
                {'error': 'No shoes found'},
                status=status.HTTP_400_BAD_REQUEST
            )
         
        for _ in range(10): # Checking for duplicates. if 10 times got duplicates. All possible ones exist

            top = random.choice(list(tops))
            bottom = random.choice(list(bottoms))
            shoe = random.choice(list(shoes))

            accessory = None

            if accessories.exists():
                accessory = random.choice(list(accessories))

            selected_ids = {top.id, bottom.id, shoe.id}

            if accessory:
                selected_ids.add(accessory.id)

            duplicate = False

            for outfit in Outfit.objects.filter(user=request.user):
                # Set to check ids if same duplicate
                outfit_ids = set(
                    outfit.items.values_list(
                        'id',
                        flat=True
                    )
                )

                if outfit_ids == selected_ids:
                    duplicate = True
                    break

            if not duplicate:
                outfit = Outfit.objects.create(
                user=request.user,
                name='generated outfit',
                )
            
                outfit.items.add(top, bottom, shoe)
                if accessory:
                    outfit.items.add(accessory)
                serializer = OutfitReadSerializer(outfit)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(
            {
                'error': 'All possible outfits have already been generated'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
            
        
        
from .anthropic_service import get_outfit_recommendation
from django.core.cache import cache

class RecommendView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        cache_key = f"ai_recommendation:user:{request.user.id}"
        cached = cache.get(cache_key)
        if cached is not None:
            return Response({'recommendation': cached, 'cached': True})
        
        wardrobe_items = WardrobeItem.objects.filter(user=request.user)
        recommendation = get_outfit_recommendation(wardrobe_items)
        
        cache.set(cache_key, recommendation, timeout=3600)
        
        return Response({'recommendation': recommendation, 'cached': False})
        
        