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


class NonBlueBinRecyclableSerializer(serializers.ModelSerializer):
    class Meta:
        model = n
        fields = ('id', 'category', 'call_for_collection', 'in_good_condition', 'in_need_of_repair', 'spoilt_beyond_repair', )


class GeneralWaste(serializers.ModelSerializer):
    class Meta:
        model = g
        fields = ('id', 'category', 'reason', 'suggestion', )


class ChoicesField(serializers.Field):
    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)


class ReuseChannel(serializers.ModelSerializer):
    channel_of_reuse = ChoicesField(choices=ReuseChannel.CHANNEL_CHOICES)

    class Meta:
        model = ReuseChannel


class PhysicalChannel(serializers.ModelSerializer):
    class Meta:
        model = PhysicalChannel
        fields = ('id', 's/n', 'name_of_organisation', 'address', 'blocknumber', 'building_name', 'postcode', 'operating_hours', 'contact', 'website', 'category', 'channel_of_reuse', 'remarks', )
