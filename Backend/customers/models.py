# customers/models.py

from django.db import models


class Customer(models.Model):

    # BASIC DETAILS
    name = models.CharField(max_length=150)

    mobile = models.CharField(
        max_length=10,
        unique=True
    )

    email = models.EmailField(
        blank=True,
        null=True
    )

    password = models.CharField(max_length=255)

    # ADDRESS
    street = models.TextField()

    village = models.CharField(max_length=150)

    district = models.CharField(max_length=150)

    state = models.CharField(max_length=150)

    pincode = models.CharField(max_length=6)

    # STATUS
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.mobile}"