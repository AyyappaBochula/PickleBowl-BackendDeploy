from rest_framework.views import APIView
from rest_framework.response import Response

from products.models import Product, ProductWeight
from .models import Cart, CartItem, Coupon
from decimal import Decimal
from django.utils import timezone

from rest_framework import status

from .serializers import (
    CartSerializer,
    AddToCartSerializer,
    CheckoutSerializer,
    
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


# =========================
# CHECKOUT VIEW
# =========================
class CheckoutView(APIView):

    def post(self, request):

        customer = getattr(request, "customer", None)
        guest_id = request.headers.get("guest-id")

        serializer = CheckoutSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        cart_id = serializer.validated_data["cart_id"]
        coupon_code = serializer.validated_data.get("coupon_code", "")

        # =========================
        # GET CART
        # =========================
        try:

            cart = Cart.objects.get(id=cart_id)

        except Cart.DoesNotExist:

            return Response({
                "status": False,
                "message": "Cart not found"
            }, status=404)

        # =========================
        # SECURITY CHECK
        # =========================
        if customer:

            if cart.customer != customer:

                return Response({
                    "status": False,
                    "message": "Unauthorized cart"
                }, status=403)

        else:

            if cart.guest_id != guest_id:

                return Response({
                    "status": False,
                    "message": "Unauthorized cart"
                }, status=403)

        # =========================
        # EMPTY CART CHECK
        # =========================
        if not cart.items.exists():

            return Response({
                "status": False,
                "message": "Cart is empty"
            }, status=400)

        # =========================
        # TOTAL CALCULATION
        # =========================
        total_amount = Decimal("0")

        cart_items = []

        for item in cart.items.select_related(
            "product",
            "product_weight"
        ):

            item_total = item.total_price

            total_amount += item_total

            cart_items.append({
                "id": item.id,
                "product_id": item.product.id,
                "product_name": item.product.name,
                "weight": item.product_weight.weight_in_grams,
                "price": item.product_weight.price,
                "quantity": item.quantity,
                "total_price": item_total
            })

        # =========================
        # COUPON LOGIC
        # =========================
        discount_amount = Decimal("0")
        applied_coupon = None

        if coupon_code:

            try:

                coupon = Coupon.objects.get(
                    code=coupon_code,
                    is_active=True
                )

            except Coupon.DoesNotExist:

                return Response({
                    "status": False,
                    "message": "Invalid coupon"
                }, status=400)

            now = timezone.now()

            # DATE CHECK
            if now < coupon.valid_from or now > coupon.valid_to:

                return Response({
                    "status": False,
                    "message": "Coupon expired"
                }, status=400)

            # MINIMUM ORDER CHECK
            if total_amount < coupon.minimum_order_amount:

                return Response({
                    "status": False,
                    "message": f"Minimum order amount should be ₹{coupon.minimum_order_amount}"
                }, status=400)

            # FLAT DISCOUNT
            if coupon.discount_type == "flat":

                discount_amount = coupon.discount_value

            # PERCENTAGE DISCOUNT
            elif coupon.discount_type == "percentage":

                discount_amount = (
                    total_amount * coupon.discount_value
                ) / Decimal("100")

            applied_coupon = coupon.code

            # SAVE COUPON TO CART
            cart.coupon = coupon
            cart.save()

        else:

            # REMOVE COUPON IF EMPTY
            cart.coupon = None
            cart.save()

        # =========================
        # FINAL AMOUNT
        # =========================
        final_amount = total_amount - discount_amount

        if final_amount < 0:
            final_amount = Decimal("0")

        # =========================
        # RESPONSE
        # =========================
        return Response({
            "status": True,
            "message": "Checkout data fetched",
            "data": {

                "cart_id": cart.id,

                "cart_items": cart_items,

                "coupon_code": applied_coupon,

                "total_amount": total_amount,

                "discount_amount": discount_amount,

                "final_amount": final_amount
            }
        })



class ApplyCouponView(APIView):

    def post(self, request):

        code = request.data.get("coupon_code")
        total_amount = request.data.get("total_amount")

        if not code or total_amount is None:
            return Response({
                "status": False,
                "message": "coupon_code and total_amount required"
            }, status=400)

        try:
            total_amount = Decimal(str(total_amount))
        except:
            return Response({
                "status": False,
                "message": "Invalid total amount"
            }, status=400)

        try:
            coupon = Coupon.objects.get(
                code=code,
                is_active=True
            )
        except Coupon.DoesNotExist:
            return Response({
                "status": False,
                "message": "Invalid coupon"
            }, status=400)

        now = timezone.now()

        # DATE VALIDATION
        if now < coupon.valid_from or now > coupon.valid_to:
            return Response({
                "status": False,
                "message": "Coupon expired"
            }, status=400)

        # MINIMUM ORDER CHECK
        if total_amount < coupon.minimum_order_amount:
            return Response({
                "status": False,
                "message": f"Minimum order should be ₹{coupon.minimum_order_amount}"
            }, status=400)

        # CALCULATE DISCOUNT
        if coupon.discount_type == "flat":
            discount = coupon.discount_value

        else:  # percentage
            discount = (total_amount * coupon.discount_value) / Decimal("100")

            # MAX CAP CHECK
            if coupon.max_discount_amount and discount > coupon.max_discount_amount:
                discount = coupon.max_discount_amount

        final_amount = total_amount - discount

        if final_amount < 0:
            final_amount = Decimal("0")

        return Response({
            "status": True,
            "message": "Coupon applied",
            "data": {
                "coupon_code": coupon.code,
                "total_amount": total_amount,
                "discount_amount": discount,
                "final_amount": final_amount
            }
        })