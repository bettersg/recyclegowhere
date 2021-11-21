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

class CallForCollection(models.Model):
    """
    Data Model for Objects being Collected
    
    Data Structure:
        int pk
        str name
        str items_collected
    """
    name = models.CharField(blank=True, null=True, max_length=100)
    items_collected = models.CharField(blank=True, null=True, max_length=1000)

    
class Item(models.Model):
    """
    Data Model for Items to be recycled or alternatively handled.

    Data Structure:
        str item
        onetomany item_category
        str material
        int bluebinrecyclable
    """
    item = models.CharField(blank=True, null=True, max_length=100)
    item_category = models.ForeignKey(Category)
    material = models.CharField(blank=True, null=True, max_length=100)
    bluebinrecyclable = models.IntegerField(blank=True, null=True)




class CatHandle(models.Model):
    """
    Data Model for Handling Items based on Category
    
    Data Structure:
        str item_category
        str how_to_handle
    """
    item_category = models.CharField(blank=True, null=True, max_length=100)
    how_to_handle = models.CharField(blank=True, null=True, max_length=1000)


class CheckCondition(models.Model):
    """
    Data Model for Handling Non-Blue Bin Recyclables by Condition

    Data Structure:
        str condition_cat
        str in_good_condition
        str in_need_of_repair
        str spoilt_beyond_repair
    """
    condition_cat = models.CharField(blank=True, null=True, max_length=100)
    in_good_condition = models.CharField(blank=True, null=True, max_length=100)
    in_need_of_repair = models.CharField(blank=True, null=True, max_length=100)
    spoilt_beyond_repair = models.CharField(blank=True, null=True, max_length=100)

class ReuseChannel(models.Model):
    """
    Data Model for Handling Reuse Channels
    """
    channel_of_reuse = models.CharField(blank=True, null=True, max_length=100)

class PhysicalChannel(models.Model):
    """
    Data Model for Physical Channels (from MSE and Alternative Sources)
    """
    name_of_organisation = models.CharField(
        blank=True, null=True, max_length=100)
    address = models.CharField(blank=True, null=True, max_length=1000)
    blocknumber = models.CharField(blank=True, null=True, max_length=10)
    building_name = models.CharField(blank=True, null=True, max_length=100)
    postcode = models.IntegerField(blank=True, null=True)
    operating_hours = models.CharField(blank=True, null=True, max_length=1000)
    contact = models.IntegerField(blank=True, null=True)
    category = models.ForeignKey(Category)
    channel_of_reuse = models.ForeignKey(ReuseChannel)
    remarks = models.CharField(blank=True, null=True, max_length=1000)


# def getLatLong(postalCode): return tuple((lambda dict: map(float, map(dict.get, ["LATITUDE", "LONGITUDE"])))(json.loads(urllib.request.urlopen(f"https://developers.onemap.sg/commonapi/search?searchVal={postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1").read())["results"][0]))

class Item(models.Model):
    """
    Abstract Data Model for Items to be Recycled or Disposed.

    Data Structure:
        int pk
        str name
        int bluebinrecyclable
    
    Example of Data: (10, "Medicine Glassware", 2)
    """
    name = models.CharField(blank=True, null=True, max_length=100)
    bluebinrecyclable = models.IntegerField(blank=True, null=True)

    class Meta:
        abstract = True

class BlueBinRecyclable(Item):
    """
    Data Model for Items that can be Recycled via the Blue Bins

    Note: Inherits from Item Class, hence contains some of the pre-existing arguments

    Data Structure:
        int pk
        str name
        int bluebinrecyclable = 0
        str how_to_handle
    
    """
    bbr = 0
    how_to_handle = models.CharField(blank=True, null=True, max_length=1000)

class NonBlueBinRecyclable(Item):
    bbr = 1
    category = models.ForeignKey(Category)

class GeneralWaste(Item):
    bbr = 2
    #name = models.CharField(blank=True, null=True, max_length=100)
    reason = models.CharField(blank=True, null=True, max_length=1000)
    suggestions = models.CharField(blank=True, null=True, max_length=1000)

class RecyclingLocation(models.Model):
    latitude = models.IntegerField(blank=True, null=True)
    longitude = models.IntegerField(blank=True, null=True)
    location_descriptor = models.CharField(blank=True, null=True, max_length=1000)
    item_idx = models.IntegerField(blank=True, null=True)
    references = models.IntegerField(blank=True, null=True)
    items = models.IntegerField(blank=True, null=True)

class MSEPhysicalChannel(models.Model):
    name_of_organisation = models.CharField(blank=True, null=True, max_length=100)
    address = models.CharField(blank=True, null=True, max_length=1000)
    blocknumber = models.CharField(blank=True, null=True, max_length=10)
    building_name = models.CharField(blank=True, null=True, max_length=100)
    postcode = models.IntegerField(blank=True, null=True)
    operating_hours = models.CharField(blank=True, null=True, max_length=1000)
    contact = models.IntegerField(blank=True, null=True)
    remarks = models.CharField(blank=True, null=True, max_length=1000)
