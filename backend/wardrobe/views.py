from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404

from .serializers import WardrobeItemSerializer
from .models import WardrobeItem

class WardrobeListView(APIView):
    def get(self, request):
        items = WardrobeItem.objects.all()
        serializer = WardrobeItemSerializer(items, many=True)
        return Response(serializer.data)
    
    
    def post(self, request):
        serializer = WardrobeItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class WardrobeDetailView(APIView):
    def get_object(self, id):
        # item = WardrobeItem.objects.get(pk=id) simple way, might be fall server, if no such id
        # item = WardrobeItem.objects.get(pk=id, user=request.user) userге қарап жұмыс істеу
        return get_object_or_404(WardrobeItem, pk=id)
    
    def get(self, request, id):
        item = self.get_object(id)
        serializer = WardrobeItemSerializer(item)
        return Response(serializer.data)
    
    def put(self, request, id):
        item = self.get_object(id)
        serializer = WardrobeItemSerializer(item, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        item = self.get_object(id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    