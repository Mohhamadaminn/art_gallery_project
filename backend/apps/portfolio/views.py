from django.shortcuts import render
from rest_framework import viewsets

from .models import Artist, ArtistWork, Course
from .serializers import ArtistSerializer, ArtistWorkSerializer, CourseSerializer


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistWorkViewSet(viewsets.ModelViewSet):
    queryset = ArtistWork.objects.all()
    serializer_class = ArtistWorkSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer