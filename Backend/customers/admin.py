from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "mobile",
        "email",
        "district",
        "state",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "mobile",
        "email",
    )

    list_filter = (
        "state",
        "district",
        "is_active",
    )