from rest_framework.views import APIView
from rest_framework.response import Response

from products.models import Product, ProductWeight
from .models import Cart, CartItem, Coupon, Order, OrderItem

from .serializers import (
    CartSerializer,
    AddToCartSerializer,
    CouponApplySerializer,
    CheckoutSerializer
)

# =========================
# GET OR CREATE CART
# =========================
def get_cart(customer=None, guest_id=None):

    if customer:
        cart, _ = Cart.objects.get_or_create(customer=customer)
        return cart

    cart, _ = Cart.objects.get_or_create(guest_id=guest_id)
    return cart


# =========================
# CART VIEW
# =========================
class CartView(APIView):

    def get(self, request):

        customer = getattr(request, "customer", None)
        guest_id = request.headers.get("guest-id")

        cart = get_cart(customer, guest_id)

        serializer = CartSerializer(cart)

        return Response({
            "status": True,
            "data": serializer.data
        })


# =========================
# ADD TO CART (FIXED - NO DUPLICATES)
# =========================
class AddToCartView(APIView):

    def post(self, request):

        customer = getattr(request, "customer", None)
        guest_id = request.headers.get("guest-id")

        if not customer and not guest_id:
            return Response({
                "status": False,
                "message": "guest-id required"
            }, status=400)

        cart = get_cart(customer, guest_id)

        serializer = AddToCartSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        try:
            product_id = serializer.validated_data["product_id"]
            weight_id = serializer.validated_data["product_weight_id"]
            quantity = serializer.validated_data["quantity"]

            product = Product.objects.get(id=product_id)
            weight = ProductWeight.objects.get(id=weight_id)

        except Product.DoesNotExist:
            return Response({"status": False, "message": "Product not found"}, status=404)

        except ProductWeight.DoesNotExist:
            return Response({"status": False, "message": "Weight not found"}, status=404)

        # =========================
        # 🔥 IMPORTANT FIX HERE
        # ONE ITEM PER PRODUCT ONLY
        # =========================
        item = CartItem.objects.filter(
            cart=cart,
            product=product
        ).first()

        if item:

            # UPDATE EXISTING ITEM
            item.product_weight = weight
            item.quantity += quantity
            item.save()

        else:

            # CREATE NEW ITEM
            item = CartItem.objects.create(
                cart=cart,
                product=product,
                product_weight=weight,
                quantity=quantity
            )

        return Response({
            "status": True,
            "message": "Item added to cart"
        })


# =========================
# UPDATE CART ITEM (NEW API)
# =========================
class UpdateCartItemView(APIView):

    def post(self, request):

        item_id = request.data.get("item_id")
        weight_id = request.data.get("product_weight_id")
        quantity = request.data.get("quantity")

        try:
            item = CartItem.objects.get(id=item_id)

            if weight_id:
                weight = ProductWeight.objects.get(id=weight_id)
                item.product_weight = weight

            if quantity is not None:
                item.quantity = quantity

            item.save()

            return Response({
                "status": True,
                "message": "Cart updated successfully"
            })

        except CartItem.DoesNotExist:
            return Response({
                "status": False,
                "message": "Cart item not found"
            }, status=404)

        except ProductWeight.DoesNotExist:
            return Response({
                "status": False,
                "message": "Invalid weight"
            }, status=404)


# =========================
# REMOVE ITEM
# =========================
class RemoveCartItemView(APIView):

    def delete(self, request, item_id):

        try:
            item = CartItem.objects.get(id=item_id)
            item.delete()

            return Response({
                "status": True,
                "message": "Item removed"
            })

        except CartItem.DoesNotExist:

            return Response({
                "status": False,
                "message": "Item not found"
            }, status=404)
class UpdateCartQtyView(APIView):

    def post(self, request):

        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")

        if not item_id or quantity is None:
            return Response({"error": "Invalid data"}, status=400)

        try:
            item = CartItem.objects.get(id=item_id)

            quantity = int(quantity)

            if quantity < 1:
                item.delete()
                return Response({"message": "Item removed"})

            item.quantity = quantity
            item.save()

            return Response({"status": True, "message": "Updated"})

        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)