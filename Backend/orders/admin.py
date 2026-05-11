
from django.contrib import admin
from .models import Order, OrderItem


class OrderItemAdmin(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "name",
        "phone",
        "email",
        "final_amount",
        "payment_status",
        "created_at"
    ]

    inlines = [OrderItemAdmin]
