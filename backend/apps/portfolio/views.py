from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Artist, ArtistWork, Course
from .serializers import ArtistSerializer, ArtistWorkSerializer, CourseSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    @action(detail=False, methods=['get'])
    def profile(self, request):
        artist = Artist.objects.first()
        serializer = self.get_serializer(artist)
        return Response(serializer.data)


class ArtistWorkViewSet(viewsets.ModelViewSet):
    queryset = ArtistWork.objects.all()
    serializer_class = ArtistWorkSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer