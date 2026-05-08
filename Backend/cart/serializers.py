from rest_framework import serializers
from .models import Cart, CartItem, Coupon, Order, OrderItem
from products.models import Product, ProductWeight
class CartItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(source="product.name", read_only=True)
    weight = serializers.CharField(source="product_weight.weight_in_grams", read_only=True)
    price = serializers.DecimalField(source="product_weight.price", read_only=True, max_digits=10, decimal_places=2)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_weight",
            "weight",
            "price",
            "quantity",
            "total_price"
        ]
class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(many=True, read_only=True)
    total_cart_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            "id",
            "customer",
            "guest_id",
            "coupon",
            "items",
            "total_cart_price"
        ]

    def get_total_cart_price(self, obj):

        total = 0

        for item in obj.items.all():
            total += item.total_price

        return total
class AddToCartSerializer(serializers.Serializer):

    product_id = serializers.IntegerField()
    product_weight_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
class CouponApplySerializer(serializers.Serializer):

    code = serializers.CharField()
class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = "__all__"
class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
class CheckoutSerializer(serializers.Serializer):

    full_name = serializers.CharField()
    mobile = serializers.CharField()
    email = serializers.EmailField(required=False)

    address = serializers.CharField()
    village_city = serializers.CharField()
    mandal = serializers.CharField()
    district = serializers.CharField()
    state = serializers.CharField()
    pincode = serializers.CharField()