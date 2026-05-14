from django.contrib import admin

from .models import AdminUser


@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "mobile",
        "role",
        "is_active",
        "created_at",
    )

    list_filter = (
        "role",
        "is_active",
    )

    search_fields = (
        "name",
        "mobile",
    )

    ordering = (
        "-created_at",
    )