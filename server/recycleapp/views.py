from rest_framework import viewsets
from django.shortcuts import render
from .serializers import *
from .models import *


# Create your views here.
def index(request):
    return render(request, "recycleapp/index.html")

def about(request):
    return render(request, "recycleapp/about.html")

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class CallForCollectionViewSet(viewsets.ModelViewSet):
    queryset = CallForCollection.objects.all()
    serializer_class = CallForCollectionSerializer

class BlueBinRecyclableViewSet(viewsets.ModelViewSet):
    queryset = b.objects.all()
    serializer_class = BlueBinRecyclableSerializer

class NonBlueBinRecyclableViewSet(viewsets.ModelViewSet):
    queryset = n.objects.all()
    serializer_class = NonBlueBinRecyclableSerializer

class GeneralWasteViewSet(viewsets.ModelViewSet):
    queryset = g.objects.all()
    serializer_class = GeneralWasteSerializer

class ReuseChannelViewSet(viewsets.ModelViewSet):
    queryset = ReuseChannel.objects.all()
    serializer_class = ReuseChannelSerializer

class PhysicalChannelViewSet(viewsets.ModelViewSet):
    queryset = PhysicalChannel.objects.all()
    serializer_class = PhysicalChannelSerializer
