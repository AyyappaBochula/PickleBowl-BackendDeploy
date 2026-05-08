from django.contrib import admin
from .models import Cart, CartItem, Coupon, Order, OrderItem


# =========================
# CART ITEM INLINE
# =========================
class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


# =========================
# CART ADMIN
# =========================
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer",
        "guest_id",
        "coupon",
        "created_at"
    )

    search_fields = (
        "customer__name",
        "guest_id"
    )

    inlines = [CartItemInline]


# =========================
# CART ITEM ADMIN
# =========================
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "cart",
        "product",
        "product_weight",
        "quantity",
        "total_price"
    )

    search_fields = (
        "product__name",
        "cart__id"
    )


# =========================
# COUPON ADMIN
# =========================
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):

    list_display = (
        "code",
        "discount_type",
        "discount_value",
        "minimum_order_amount",
        "is_active",
        "valid_from",
        "valid_to"
    )

    search_fields = ("code",)


# =========================
# ORDER ITEM INLINE
# =========================
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


# =========================
# ORDER ADMIN
# =========================
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer",
        "guest_id",
        "total_amount",
        "payment_status",
        "order_status",
        "created_at"
    )

    list_filter = (
        "payment_status",
        "order_status"
    )

    search_fields = (
        "customer__name",
        "mobile",
        "id"
    )

    inlines = [OrderItemInline]


# =========================
# ORDER ITEM ADMIN
# =========================
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "order",
        "product_name",
        "quantity",
        "total_price"
    )