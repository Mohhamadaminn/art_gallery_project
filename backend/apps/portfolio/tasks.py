from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings


@shared_task
def send_registration_confirmation_email(user_email, event_title, event_type):
    subject = f"Registration confirmed: {event_title}"
    message = (
        f"You're confirmed for the {event_type} \"{event_title}\".\n\n"
        f"Thanks for registering!"
    )
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user_email],
        fail_silently=False,
    )