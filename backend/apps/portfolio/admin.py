from django.contrib import admin
from .models import Artist, ArtistWork, Course, Meeting, CourseRegistration, MeetingRegistration

admin.site.register(Artist)
admin.site.register(ArtistWork)
admin.site.register(Course)
admin.site.register(Meeting)
admin.site.register(CourseRegistration)
admin.site.register(MeetingRegistration)
