from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Meeting, MeetingRegistration, Course, CourseRegistration

User = get_user_model()


class MeetingRegistrationTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='alice', password='pass1234')
        self.staff = User.objects.create_user(username='admin', password='pass1234', is_staff=True)

        self.future_meeting = Meeting.objects.create(
            title='Studio Visit',
            date_time=timezone.now() + timedelta(days=7),
            price=20,
            capacity=1,
        )
        self.past_meeting = Meeting.objects.create(
            title='Old Workshop',
            date_time=timezone.now() - timedelta(days=1),
            price=10,
            capacity=5,
        )

    def _register_url(self, meeting_id):
        return f'/api/meetings/{meeting_id}/register/'

    def test_unauthenticated_user_cannot_register(self):
        response = self.client.post(self._register_url(self.future_meeting.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_user_can_register(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(self._register_url(self.future_meeting.id))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            MeetingRegistration.objects.filter(user=self.user, meeting=self.future_meeting).exists()
        )

    def test_cannot_register_twice(self):
        self.client.force_authenticate(self.user)
        self.client.post(self._register_url(self.future_meeting.id))
        response = self.client.post(self._register_url(self.future_meeting.id))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('already registered', response.data['detail'])

    def test_cannot_register_when_full(self):
        # capacity is 1 — fill it with a different (paid) user first
        other_user = User.objects.create_user(username='bob', password='pass1234')
        MeetingRegistration.objects.create(user=other_user, meeting=self.future_meeting, is_paid=True)

        self.client.force_authenticate(self.user)
        response = self.client.post(self._register_url(self.future_meeting.id))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('full', response.data['detail'])

    def test_unpaid_registrations_do_not_block_seats(self):
        # unpaid registration should NOT count against seats_left
        other_user = User.objects.create_user(username='carol', password='pass1234')
        MeetingRegistration.objects.create(user=other_user, meeting=self.future_meeting, is_paid=False)

        self.assertEqual(self.future_meeting.seats_left, 1)

    def test_cannot_register_for_past_meeting(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(self._register_url(self.past_meeting.id))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('already taken place', response.data['detail'])

    def test_seats_left_endpoint(self):
        response = self.client.get(f'/api/meetings/{self.future_meeting.id}/seats_left/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['seats_left'], 1)

    def test_capacity_below_one_rejected(self):
        meeting = Meeting(title='Bad', date_time=timezone.now() + timedelta(days=1), price=0, capacity=0)
        with self.assertRaises(Exception):
            meeting.full_clean()

    def test_negative_price_rejected(self):
        meeting = Meeting(title='Bad', date_time=timezone.now() + timedelta(days=1), price=-5, capacity=1)
        with self.assertRaises(Exception):
            meeting.full_clean()


class CourseRegistrationTests(APITestCase):
    """Same scenarios, applied to Course since it shares the pattern."""

    def setUp(self):
        self.user = User.objects.create_user(username='dave', password='pass1234')
        self.course = Course.objects.create(
            title='Painting 101',
            price=50,
            capacity=1,
        )

    def test_cannot_register_when_full(self):
        other = User.objects.create_user(username='erin', password='pass1234')
        CourseRegistration.objects.create(user=other, course=self.course, is_paid=True)

        self.client.force_authenticate(self.user)
        response = self.client.post(f'/api/courses/{self.course.id}/register/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)