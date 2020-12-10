from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register("posts", views.PostViewSet)
router.register("bookmark", views.BookMarkList)
router.register("user", views.UserViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", views.CommentViewSet)

# router.register('date', views.DateViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),


]
