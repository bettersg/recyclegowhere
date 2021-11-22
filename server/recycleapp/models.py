from django.db import models

# Create your models here.

class ItemList(models.Model):
    item = models.CharField(max_length=200)

    def __str__(self):
        return self.item
