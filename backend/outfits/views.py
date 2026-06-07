from rest_framework.views import APIView
from .models import Outfit
from .serializer import OutfitReadSerializer, OutfitWriteSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

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