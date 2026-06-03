from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import WardrobeItemSerializer
from .models import WardrobeItem

class WardrobeListView(APIView):
    def get(self, request):
        items = WardrobeItem.objects.all()
        serializer = WardrobeItemSerializer(items, many=True)
        return Response(serializer.data)
    
    
    