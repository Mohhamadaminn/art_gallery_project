from rest_framework import serializers
from django.utils import timezone

from .models import Artist, ArtistWork, Course, Meeting, CourseRegistration, MeetingRegistration, PastEvent

class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'profile_picture', 'email', 'phone', 'location', 'instagram',]
        read_only_fields = ['created_at']


class ArtistWorkSerializer(serializers.ModelSerializer):

    class Meta: 
        model = ArtistWork
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    seats_left = serializers.ReadOnlyField()
    is_registered = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'image', 'price',
                  'start_date', 'capacity', 'seats_left', 'is_registered']

    def get_is_registered(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return obj.registrations.filter(user=request.user, is_paid=True).exists()



class MeetingSerializer(serializers.ModelSerializer):
    seats_left = serializers.ReadOnlyField()
    is_registered = serializers.SerializerMethodField()

    class Meta:
        model = Meeting
        fields = ['id', 'title', 'description', 'image', 'date_time', 'location',
                  'price', 'capacity', 'seats_left', 'is_registered']

    def get_is_registered(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return obj.registrations.filter(user=request.user, is_paid=True).exists()
    


class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = '__all__'
        read_only_fields = ['user', 'registered_at', 'is_paid', 'payment_reference']


    def validate_course(self, course):
        if course.seats_left <= 0:
            raise serializers.ValidationError("This course is fully booked.")
        if course.start_date and course.start_date < timezone.now():
            raise serializers.ValidationError("This course has already started.")
        return course
    


class MeetingRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeetingRegistration
        fields = '__all__'
        read_only_fields = ['user', 'registered_at', 'is_paid', 'payment_reference']

    def validate_meeting(self, meeting):
        if meeting.seats_left <= 0:
            raise serializers.ValidationError("This meeting is fully booked.")
        if meeting.date_time < timezone.now():
            raise serializers.ValidationError("This meeting has already taken place.")
        return meeting


class PastEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastEvent
        fields = [
            "id",
            "content_type",
            "object_id",
            "image",
            "caption",
            "created_at",
        ]



