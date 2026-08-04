from celery import shared_task
from django.core.mail import send_mail
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from .models import CourseRegistration, MeetingRegistration


@shared_task
def send_registration_confirmation_email(user_email, event_title, event_type):
    subject = f"Registration confirmed: {event_title}"
    message = (
        f"You're confirmed for the {event_type} \"{event_title}\".\n\n"
        f"Thanks for registering!"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user_email], fail_silently=False)


@shared_task
def send_event_reminder_email(user_email, event_title, event_type):
    subject = f"Reminder: {event_title} is coming up"
    message = (
        f"Just a reminder that the {event_type} \"{event_title}\" "
        f"is happening in the next 24 hours.\n\n"
        f"See you there!"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user_email], fail_silently=False)


@shared_task
def send_upcoming_event_reminders():
    now = timezone.now()
    window_end = now + timedelta(hours=24)

    course_regs = CourseRegistration.objects.filter(
        is_paid=True,
        reminder_sent=False,
        course__start_date__gte=now,
        course__start_date__lte=window_end,
    ).select_related("user", "course")

    for reg in course_regs:
        if reg.user.email:
            send_event_reminder_email.delay(
                reg.user.email, reg.course.title, "course"
            )
        reg.reminder_sent = True
        reg.save(update_fields=["reminder_sent"])

    meeting_regs = MeetingRegistration.objects.filter(
        is_paid=True,
        reminder_sent=False,
        meeting__date_time__gte=now,
        meeting__date_time__lte=window_end,
    ).select_related("user", "meeting")

    for reg in meeting_regs:
        if reg.user.email:
            send_event_reminder_email.delay(
                reg.user.email, reg.meeting.title, "meeting"
            )
        reg.reminder_sent = True
        reg.save(update_fields=["reminder_sent"])