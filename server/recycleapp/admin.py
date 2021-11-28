from django.contrib import admin
from .models import Category, Items, CallForCollection, b, n, g, ReuseChannel, PhysicalChannels

# Register your models here.

admin.site.register(Category)
admin.site.register(Items)
admin.site.register(CallForCollection)
admin.site.register(b)
admin.site.register(n)
admin.site.register(g)
admin.site.register(ReuseChannel)
admin.site.register(PhysicalChannels)