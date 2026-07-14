from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, ArtistWorkViewSet, CourseViewSet

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artist')
router.register(r'artworks', ArtistWorkViewSet, basename='artistwork')
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = router.urls