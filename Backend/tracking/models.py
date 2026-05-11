from django.db import models

from orders.models import Order


# =====================================
# ORDER TRACKING MODEL
# =====================================
class OrderTracking(models.Model):

    TRACKING_STATUS = (

        ("placed", "Order Placed"),

        ("confirmed", "Confirmed"),

        ("packed", "Packed"),

        ("shipped", "Shipped"),

        ("out_for_delivery", "Out For Delivery"),

        ("delivered", "Delivered"),

        ("cancelled", "Cancelled"),
    )

    order = models.ForeignKey(

        Order,

        on_delete=models.CASCADE,

        related_name="tracking_history"
    )

    # =====================================
    # CUSTOMER DETAILS SNAPSHOT
    # =====================================
    customer_name = models.CharField(

        max_length=255
    )

    customer_phone = models.CharField(

        max_length=20
    )

    customer_email = models.EmailField()

    # =====================================
    # TRACKING STATUS
    # =====================================
    status = models.CharField(

        max_length=50,

        choices=TRACKING_STATUS
    )

    # =====================================
    # TRACKING MESSAGE
    # =====================================
    message = models.TextField(

        blank=True,

        null=True
    )

    # =====================================
    # EMAIL STATUS
    # =====================================
    email_sent = models.BooleanField(

        default=False
    )

    created_at = models.DateTimeField(

        auto_now_add=True
    )

    updated_at = models.DateTimeField(

        auto_now=True
    )

    class Meta:

        ordering = ["created_at"]

    def __str__(self):

        return f"Order #{self.order.id} - {self.status}"