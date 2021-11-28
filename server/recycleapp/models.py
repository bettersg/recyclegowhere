from django.db import models
import urllib, json

# Create your models here.

class Category(models.Model):
    """
    Data Model for Categorising Items.

    Data Structure:
        str category
    """
    category = models.CharField(blank=True, null=True, max_length=100)


class Items(models.Model):
    """
    Data Model for Items in General

    Data Structure:
        str examples/description
        onetomany category
        int bluebinrecyclable
    """
    description = models.CharField(blank=True, null=True, max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    bluebinrecyclable = models.IntegerField(blank=True, null=True)


class b(models.Model):
    """
    Data Model for Blue Bin Recyclables

    Data Structure:
        int pk (predefined)
        str category
        str question
    """
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    question = models.CharField(blank=True, null=True, max_length=1000)


class CallForCollection(models.Model):
    """
    Data Model for Call For Collection

    Data Structure:
        int pk (predefined)
        str name
        str items_collected
    """
    name = models.CharField(blank=True, null=True, max_length=100)
    items_collected = models.CharField(blank=True, null=True, max_length=1000)

class n(models.Model):
    """
    Data Model for Non-Blue Bin Recyclables

    Data Structure:
        str category
        manytomany call_for_collection
        str in_good_condition
        str in_need_of_repair
        str spoilt_beyond_repair
    """
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    call_for_collection = models.ManyToManyField(CallForCollection)
    in_good_condition = models.CharField(blank=True, null=True, max_length=1000)
    in_need_of_repair = models.CharField(blank=True, null=True, max_length=1000)
    spoilt_beyond_repair = models.CharField(blank=True, null=True, max_length=1000)

class g(models.Model):
    """
    Data Model for General Waste

    Data Structure:
        int pk (predefined)
        str category
        str reason
        str suggestion
    """
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    reason = models.CharField(blank=True, null=True, max_length=1000)
    suggestion = models.CharField(blank=True, null=True, max_length=1000)


class ReuseChannel(models.Model):
    """
    Data Model for Handling Reuse Channels

    Data Structure:
        str channel_of_reuse

    Choices:
        channel_of_reuse: Donate, Resell, Repair
    """
    CHANNEL_CHOICES = [
        ("DONATE", "Donate"),
        ("RESELL", "Resell"),
        ("REPAIR", "Repair")
    ]
    channel_of_reuse = models.CharField(blank=True, null=True, max_length=100, choices=CHANNEL_CHOICES)


class PhysicalChannels(models.Model):
    """
    Data Model for Physical Channels

    Data Structure:
        int s/n
        str name_of_organisation
        str address
        str blocknumber
        str building_name
        int postcode
        str operating_hours
        int contact
        slug website
        onetomany category
        onetomany channel_of_reuse
        str remarks
    """
    sn = models.IntegerField(blank=True, null=True)
    name_of_organisation = models.CharField(blank=True, null=True, max_length=100)
    address = models.CharField(blank=True, null=True, max_length=1000)
    blocknumber = models.CharField(blank=True, null=True, max_length=10)
    building_name = models.CharField(blank=True, null=True, max_length=100)
    postcode = models.IntegerField(blank=True, null=True)
    operating_hours = models.CharField(blank=True, null=True, max_length=1000)
    contact = models.IntegerField(blank=True, null=True)
    website = models.SlugField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    channel_of_reuse = models.ForeignKey(
        ReuseChannel, on_delete=models.CASCADE)
    remarks = models.CharField(blank=True, null=True, max_length=1000)
