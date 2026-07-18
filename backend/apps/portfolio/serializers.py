from rest_framework import serializers

from .models import Artist, ArtistWork, Course, CourseRegistration


class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'profile_picture', 'email', 'phone', 'location', 'website', 'instagram', 'created_at']
        read_only_fields = ['created_at']


class ArtistWorkSerializer(serializers.ModelSerializer):

    class Meta: 
        model = ArtistWork
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):

    seats_left = serializers.ReadOnlyField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'price', 'start_date', 'capacity', 'seats_left']



class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = '__all__'
        read_only_fields = ['user', 'registered_at', 'is_paid', 'payment_reference']

