from django.contrib import admin
from .models import Category, Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel
from import_export.admin import ImportExportModelAdmin
# Register your models here.

@admin.register(Category, Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel)
class ViewAdmin(ImportExportModelAdmin):
    pass