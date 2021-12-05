from django.shortcuts import render
from .serializers import *

# Create your views here.
def index(request):
    return render(request, "recycleapp/index.html")

def about(request):
    return render(request, "recycleapp/about.html")