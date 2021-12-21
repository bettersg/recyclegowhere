from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'Category', views.CategoryViewSet)
router.register(r'Item', views.ItemViewSet)
router.register(r'CallForCollection', views.CallForCollectionViewSet)
router.register(r'BlueBinRecyclable', views.BlueBinRecyclableViewSet)
router.register(r'NonBlueBinRecyclable', views.NonBlueBinRecyclableViewSet)
router.register(r'GeneralWaste', views.GeneralWasteViewSet)
router.register(r'ReuseChannel', views.ReuseChannelViewSet)
router.register(r'PhysicalChannel', views.PhysicalChannelViewSet)


urlpatterns = [
    path("index/", views.index, name="index"),
    path("about/", views.about, name="about"),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
