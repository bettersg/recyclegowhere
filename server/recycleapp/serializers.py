from rest_framework import serializers
from .models import Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel, OneMapRecyclingBin


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'description', 'category', 'bluebinrecyclable', )

class CallForCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallForCollection
        fields = ('id', 'name', 'contact_method', 'contact_number', 'whatsapp', 'website', 'minimum_weight', 'pricing_terms', )

class BlueBinRecyclableSerializer(serializers.ModelSerializer):
    class Meta:
        model = b
        fields = ('id', 'category', 'question', )

class NonBlueBinRecyclableSerializer(serializers.ModelSerializer):
    class Meta:
        model = n
        fields = ('id', 'category', 'call_for_collection', 'in_good_condition', 'in_need_of_repair', 'spoilt_beyond_repair', 'other_avenues', 'list_of_recycling_locations', )

class GeneralWasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = g
        fields = ('id', 'description', 'category', 'reason', 'suggestion', )

class ChoicesField(serializers.Field):
    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)

class ReuseChannelSerializer(serializers.ModelSerializer):
    channel_of_reuse = ChoicesField(choices = ReuseChannel.CHANNEL_CHOICES)

    class Meta:
        model = ReuseChannel
        fields = '__all__'

class PhysicalChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalChannel
        fields = ('id', 'organisation_name', 'channel_name', 'address', 'block_number', 'street_name', 'building_name', 'postcode', 'latitude', 'longitude', 'operating_hours', 'contact', 'website', 'categories_accepted', 'type', 'channel_of_reuse', 'remarks', )

class OneMapRecyclingBinSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneMapRecyclingBin
        fields = '__all__'
