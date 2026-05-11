from django.contrib import admin

from .models import OrderTracking


@admin.register(OrderTracking)
class OrderTrackingAdmin(admin.ModelAdmin):

    list_display = (

        "id",

        "order",

        "customer_name",

        "customer_phone",

        "customer_email",

        "status",

        "email_sent",

        "created_at"
    )

    list_filter = (

        "status",

        "email_sent",

        "created_at"
    )

    search_fields = (

        "order__id",

        "customer_name",

        "customer_phone",

        "customer_email"
    )

    ordering = (

        "-created_at",
    )