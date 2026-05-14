from django.db import models


class AdminUser(models.Model):

    ROLE_CHOICES = (

        ("superadmin", "Super Admin"),

        ("admin", "Admin"),

        ("staff", "Staff"),
    )

    name = models.CharField(
        max_length=150
    )

    mobile = models.CharField(
        max_length=10,
        unique=True
    )

    password = models.CharField(
        max_length=255
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="staff"
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.name} - {self.role}"