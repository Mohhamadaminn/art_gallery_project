from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, ArtistWorkViewSet, CourseViewSet, MeetingViewSet, PastEventViewSet

router = DefaultRouter()
router.register(r'artists', ArtistViewSet, basename='artist')
router.register(r'artworks', ArtistWorkViewSet, basename='artistwork')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'meetings', MeetingViewSet, basename='meeting')
router.register(r'pastevents', PastEventViewSet, basename="pastevents")

urlpatterns = router.urls