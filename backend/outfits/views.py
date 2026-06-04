from rest_framework.views import APIView
from .models import Outfit
from .serializer import OutfitSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class OutfitListView(APIView):
    def get(self, request):
        items = Outfit.objects.all()
        serializer = OutfitSerializer(items, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = OutfitSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OutfitDetailView(APIView):
    def get_object(self, pk):
        # Outfit.objects.get(PK=PK)
        return get_object_or_404(Outfit, pk=pk)
    
    def get(self, request, pk):
        item = self.get_object(pk)
        serializer = OutfitSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        item = self.get_object(pk)
        serializer = OutfitSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        item = self.get_object(pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)