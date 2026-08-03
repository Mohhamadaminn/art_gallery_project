from rest_framework import serializers
from django.contrib.auth.models import User

from django.db import transaction
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

from rest_framework.validators import UniqueValidator

class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already registered.")]
    )
    phone_number = serializers.CharField(write_only=True, max_length=20)
    age = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'phone_number', 'age']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_age(self, value):
        return value if value != '' else None

    def create(self, validated_data):
        phone_number = validated_data.pop('phone_number')
        age = validated_data.pop('age', None)
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            Profile.objects.create(user=user, phone_number=phone_number, age=age)
        return user