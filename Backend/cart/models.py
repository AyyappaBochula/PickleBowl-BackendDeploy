from django.db import models
from customers.models import Customer
from products.models import Product, ProductWeight


# =========================
# CART
# =========================
class Cart(models.Model):

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="carts"
    )

    guest_id = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    coupon = models.ForeignKey(
        "Coupon",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):

        if self.customer:
            return f"Cart - {self.customer.name}"

        return f"Guest Cart - {self.guest_id}"


# =========================
# CART ITEM
# =========================
class CartItem(models.Model):

    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    product_weight = models.ForeignKey(
        ProductWeight,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # ✅ PREVENT DUPLICATE ITEMS
    class Meta:
        unique_together = (
            "cart",
            "product",
            "product_weight"
        )

    # ✅ TOTAL PRICE
    @property
    def total_price(self):
        return self.product_weight.price * self.quantity

    def __str__(self):
        return (
            f"{self.product.name} "
            f"({self.product_weight.weight_in_grams}g)"
        )


# =========================
# COUPON
# =========================
class Coupon(models.Model):

    DISCOUNT_TYPE = (
        ("flat", "Flat"),
        ("percentage", "Percentage"),
    )

    code = models.CharField(
        max_length=50,
        unique=True
    )

    discount_type = models.CharField(
        max_length=20,
        choices=DISCOUNT_TYPE
    )

    discount_value = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    minimum_order_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    # ✅ OPTIONAL MAX DISCOUNT
    # Example:
    # 20% OFF up to ₹200
    max_discount_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    is_active = models.BooleanField(default=True)

    valid_from = models.DateTimeField()

    valid_to = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code