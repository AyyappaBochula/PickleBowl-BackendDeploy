from django.db import models

from customers.models import Customer

from products.models import (
    Product,
    ProductWeight
)


# =====================================
# ORDER MODEL
# =====================================
class Order(models.Model):

    PAYMENT_STATUS = (

        ("pending", "Pending"),

        ("paid", "Paid"),

        ("failed", "Failed"),
    )

    customer = models.ForeignKey(

        Customer,

        on_delete=models.SET_NULL,

        null=True,

        blank=True
    )

    guest_id = models.CharField(

        max_length=255,

        null=True,

        blank=True
    )

    razorpay_order_id = models.CharField(

        max_length=255,

        blank=True,

        null=True
    )

    razorpay_payment_id = models.CharField(

        max_length=255,

        blank=True,

        null=True
    )

    payment_status = models.CharField(

        max_length=20,

        choices=PAYMENT_STATUS,

        default="pending"
    )

    coupon_code = models.CharField(

        max_length=100,

        blank=True,

        null=True
    )

    total_amount = models.DecimalField(

        max_digits=10,

        decimal_places=2,

        default=0
    )

    discount_amount = models.DecimalField(

        max_digits=10,

        decimal_places=2,

        default=0
    )

    final_amount = models.DecimalField(

        max_digits=10,

        decimal_places=2,

        default=0
    )

    # =====================================
    # ADDRESS
    # =====================================
    name = models.CharField(
        max_length=255
    )

    phone = models.CharField(
        max_length=20
    )

    street = models.TextField()

    city = models.CharField(
        max_length=100
    )

    pincode = models.CharField(
        max_length=20
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"Order #{self.id}"


# =====================================
# ORDER ITEM MODEL
# =====================================
class OrderItem(models.Model):

    order = models.ForeignKey(

        Order,

        on_delete=models.CASCADE,

        related_name="items"
    )

    product = models.ForeignKey(

        Product,

        on_delete=models.SET_NULL,

        null=True
    )

    # =====================================
    # PRODUCT WEIGHT
    # =====================================
    product_weight = models.ForeignKey(

        ProductWeight,

        on_delete=models.SET_NULL,

        null=True,

        blank=True
    )

    # =====================================
    # STORE WEIGHT DIRECTLY
    # =====================================
    weight = models.PositiveIntegerField(

        null=True,

        blank=True
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    price = models.DecimalField(

        max_digits=10,

        decimal_places=2
    )

    total_price = models.DecimalField(

        max_digits=10,

        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        if self.product:

            return f"{self.product.name} x {self.quantity}"

        return f"Order Item #{self.id}"