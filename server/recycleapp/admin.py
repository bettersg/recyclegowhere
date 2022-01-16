from django.contrib import admin
from .models import Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel, OneMapRecyclingBin
from import_export.admin import ImportExportModelAdmin
# Register your models here.

@admin.register(Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel, OneMapRecyclingBin)
class ViewAdmin(ImportExportModelAdmin):
    pass