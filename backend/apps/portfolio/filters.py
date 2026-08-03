import django_filters
from .models import Course, Meeting


class CourseFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    start_after = django_filters.DateTimeFilter(field_name='start_date', lookup_expr='gte')
    start_before = django_filters.DateTimeFilter(field_name='start_date', lookup_expr='lte')

    class Meta:
        model = Course
        fields = ['min_price', 'max_price', 'start_after', 'start_before']


class MeetingFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    after = django_filters.DateTimeFilter(field_name='date_time', lookup_expr='gte')
    before = django_filters.DateTimeFilter(field_name='date_time', lookup_expr='lte')

    class Meta:
        model = Meeting
        fields = ['min_price', 'max_price', 'location', 'after', 'before']