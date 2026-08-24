import os

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand, CommandError

from adminpanel.models import AdminUser


class Command(BaseCommand):
    help = "Create or update the deployment admin accounts from environment variables."

    def handle(self, *args, **options):
        superuser_name = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        superuser_email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "")
        superuser_password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
        admin_name = os.environ.get("ADMIN_NAME")
        admin_mobile = os.environ.get("ADMIN_MOBILE")
        admin_password = os.environ.get("ADMIN_PASSWORD")

        required = {
            "DJANGO_SUPERUSER_USERNAME": superuser_name,
            "DJANGO_SUPERUSER_PASSWORD": superuser_password,
            "ADMIN_NAME": admin_name,
            "ADMIN_MOBILE": admin_mobile,
            "ADMIN_PASSWORD": admin_password,
        }
        missing = [name for name, value in required.items() if not value]
        if missing:
            raise CommandError("Missing environment variables: " + ", ".join(missing))

        user_model = get_user_model()
        user, created = user_model.objects.get_or_create(
            username=superuser_name,
            defaults={"email": superuser_email},
        )
        user.email = superuser_email
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(superuser_password)
        user.save()

        AdminUser.objects.update_or_create(
            mobile=admin_mobile,
            defaults={
                "name": admin_name,
                "password": make_password(admin_password),
                "role": "superadmin",
                "is_active": True,
            },
        )

        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{action} Django superuser: {superuser_name}"))
        self.stdout.write(self.style.SUCCESS(f"Created or updated custom admin: {admin_mobile}"))