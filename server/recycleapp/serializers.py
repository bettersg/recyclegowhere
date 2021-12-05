from rest_framework import serializers
from .models import Category, Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category',)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'description', 'category', 'bluebinrecyclable', )

class CallForCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallForCollection
        fields = ('id', 'name', 'items_collected', )


class BlueBinRecyclableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallForCollection
        fields = ('id', 'name', 'items_collected', )
