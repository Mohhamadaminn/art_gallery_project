from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS

from .models import Artist, ArtistWork, Course, CourseRegistration
from .serializers import ArtistSerializer, ArtistWorkSerializer, CourseSerializer


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=['get'])
    def profile(self, request):
        artist = Artist.objects.first()
        if artist is None:
            return Response({"detail": "Artist profile not set up yet."}, status=404)
        serializer = self.get_serializer(artist)
        return Response(serializer.data)


class ArtistWorkViewSet(viewsets.ModelViewSet):
    queryset = ArtistWork.objects.all()
    serializer_class = ArtistWorkSerializer
    permission_classes = [IsAdminOrReadOnly]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        courses = Course.objects.filter(start_date__gte=timezone.now()).order_by('start_date')
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def seats_left(self, request, pk=None):
        course = self.get_object()
        registered_count = course.registrations.count()
        remaining = course.capacity - registered_count
        return Response({"seats_left": max(remaining, 0)})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def register(self, request, pk=None):
        course = self.get_object()

        if course.registrations.count() >= course.capacity:
            return Response({"detail": "This course is full."}, status=400)

        if CourseRegistration.objects.filter(user=request.user, course=course).exists():
            return Response({"detail": "You are already registered for this course."}, status=400)

        registration = CourseRegistration.objects.create(user=request.user, course=course)
        return Response(
            {"detail": "Registered successfully.", "registration_id": registration.id},
            status=201
        )