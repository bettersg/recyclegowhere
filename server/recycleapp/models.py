from django.db import models
from model_utils import Choices

__all__ = [
    "Item",
    "b",
    "CallForCollection",
    "n",
    "g",
    "ReuseChannel",
    "PhysicalChannel",
    "OneMapRecyclingBin"
]

class Item(models.Model):
    """
    Data Model for Items in General

    Data Structure:
        str description
        onetomany category
        int bluebinrecyclable
    """
    description = models.CharField(blank=True, null=True, max_length=1000)
    category = models.CharField(max_length=255)
    bluebinrecyclable = models.IntegerField(blank=True, null=True)

    def __str__(self): return 'Item=[description: {}, category: {}, bluebinrecyclable: {}]'.format(self.description, self.category, self.bluebinrecyclable)

class CallForCollection(models.Model):
    """
    Data Model for Call For Collection

    Data Structure:
        str name
        str contact_method
        str contact_number
        str whatsapp
        str website
        str minimum_weight
        str pricing_terms
    """
    name = models.CharField(blank=True, null=True, max_length=100)
    contact_method = models.CharField(blank=True, null=True, max_length=1000)
    contact_number = models.CharField(blank=True, null=True, max_length=1000)
    whatsapp = models.CharField(blank=True, null=True, max_length=1000)
    website = models.CharField(blank=True, null=True, max_length=1000)
    minimum_weight = models.CharField(blank=True, null=True, max_length=1000)
    pricing_terms = models.CharField(blank=True, null=True, max_length=1000)

    def __str__(self): return 'CallForCollection=[name: {}]'.format(self.name)

class b(models.Model):
    """
    Data Model for Blue Bin Recyclables

    Data Structure:
        str category
        str question
    """
    category = models.CharField(max_length=255)
    question = models.CharField(blank=True, null=True, max_length=1000)

    def __str__(self): return 'b=[category: {}, question: {}]'.format(self.category, self.question)

class n(models.Model):
    """
    Data Model for Non-Blue Bin Recyclables

    Data Structure:
        str category
        manytomany call_for_collection
        str in_good_condition
        str in_need_of_repair
        str spoilt_beyond_repair
        str other_avenues
        str list_of_recycling_locations
    """
    category = models.CharField(max_length=255)
    call_for_collection = models.CharField(blank=True, null=True, max_length=1000)
    in_good_condition = models.CharField(blank=True, null=True, max_length=1000)
    in_need_of_repair = models.CharField(blank=True, null=True, max_length=1000)
    spoilt_beyond_repair = models.CharField(blank=True, null=True, max_length=1000)
    other_avenues = models.CharField(blank=True, null=True, max_length=1000)
    list_of_recycling_locations = models.CharField(blank=True, null=True, max_length=1000)

    def __str__(self): return 'n=[category: {}]'.format(self.category)

class g(models.Model):
    """
    Data Model for General Waste

    Data Structure:
        str description
        str category
        str reason
        str suggestion
    """
    description = models.CharField(blank=True, null=True, max_length=1000)
    category = models.CharField(max_length=255)
    reason = models.CharField(blank=True, null=True, max_length=1000)
    suggestion = models.CharField(blank=True, null=True, max_length=1000)

    def __str__(self): return 'g=[description: {}, category: {}]'.format(self.description, self.category)

class ReuseChannel(models.Model):
    """
    Data Model for Handling Reuse Channels

    Data Structure:
        str channel_of_reuse

    Choices:
        channel_of_reuse: Donate, Resell, Repair
    """

    CHANNEL_CHOICES = Choices(
        ("DONATE", "Donate"),
        ("RESELL", "Resell"),
        ("REPAIR", "Repair")
    )
    channel_of_reuse = models.CharField(blank=True, null=True, max_length=100, choices=CHANNEL_CHOICES)

    def __str__(self): return 'ReuseChannel=[channel_of_reuse: {}]'.format(self.channel_of_reuse)

class PhysicalChannel(models.Model):
    """
    Data Model for Physical Channels

    Data Structure:
        str name_of_organisation
        str address
        str blocknumber
        str building_name
        int postcode
        float latitude
        float longitude
        str operating_hours
        int contact
        slug website
        onetomany category
        onetomany channel_of_reuse
        str remarks
    """
    organisation_name = models.CharField(blank=True, null=True, max_length=100)
    channel_name = models.CharField(blank=True, null=True, max_length=300)
    address = models.CharField(blank=True, null=True, max_length=1000)
    block_number = models.CharField(blank=True, null=True, max_length=10)
    street_name = models.CharField(blank=True, null=True, max_length=200)
    building_name = models.CharField(blank=True, null=True, max_length=100)
    postcode = models.IntegerField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    operating_hours = models.CharField(blank=True, null=True, max_length=1000)
    contact = models.CharField(blank=True, null=True, max_length=255)
    website = models.SlugField(blank=True, null=True)
    categories_accepted = models.CharField(blank=True, null=True, max_length=1000)
    type = models.CharField(blank=True, null=True, max_length=200)
    channel_of_reuse = models.CharField(blank=True, null=True, max_length=100, choices=ReuseChannel.CHANNEL_CHOICES)
    remarks = models.CharField(blank=True, null=True, max_length=1000)

    def __str__(self): return 'PhysicalChannel=[organisation_name: {}, channel_name: {}]'.format(self.organisation_name, self.channel_name)

class OneMapRecyclingBin(models.Model):
    """
    Data Model for OneMapRecyclingBin

    Data structure:
        int postcode
        str block_number
        float latitude
        float longitude
    """
    postcode = models.IntegerField(blank=True, null=True)
    block_number = models.CharField(blank=True, null=True, max_length=10)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self): return 'OneMapRecyclingBin=[postcode: {}, block_number: {}, latitude: {}, longitude: {}]'.format(self.postcode, self.block_number, self.latitude, self.longitude)
