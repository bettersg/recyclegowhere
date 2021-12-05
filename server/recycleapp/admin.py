from django.contrib import admin
from .models import Category, Item, CallForCollection, b, n, g, ReuseChannel, PhysicalChannel

# Register your models here.

admin.site.register(Category)
admin.site.register(Item)
admin.site.register(CallForCollection)
admin.site.register(b)
admin.site.register(n)
admin.site.register(g)
admin.site.register(ReuseChannel)
admin.site.register(PhysicalChannel)