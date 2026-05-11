from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.response import Response
from tracking.models import OrderTracking
from cart.models import Cart, CartItem, Coupon
from products.models import Product, ProductWeight
from orders.models import Order, OrderItem
import razorpay
from django.conf import settings
from .email_utils import send_order_confirmation_email

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)
class CartCheckoutView(APIView):

    def post(self, request):

        try:
            guest_id = request.headers.get("guest-id")
            cart_id = request.data.get("cart_id")
            coupon_code = request.data.get("coupon_code")

            if not cart_id:
                return Response({
                    "status": False,
                    "message": "Cart ID required"
                }, status=400)

            cart = Cart.objects.filter(
                id=cart_id,
                guest_id=guest_id
            ).first()

            if not cart:
                return Response({
                    "status": False,
                    "message": "Cart not found"
                }, status=400)

            items = CartItem.objects.filter(cart=cart)

            if not items.exists():
                return Response({
                    "status": False,
                    "message": "Cart empty"
                }, status=400)

            cart_items = []
            total_amount = Decimal("0.00")

            for item in items:

                pw = item.product_weight
                price = Decimal(str(pw.price))
                total = price * item.quantity

                total_amount += total

                cart_items.append({
                    "id": item.id,
                    "product_id": item.product.id,
                    "product_name": item.product.name,
                    "weight": pw.weight_in_grams,
                    "price": float(price),
                    "quantity": item.quantity,
                    "total_price": float(total)
                })

            discount_amount = Decimal("0.00")

            # =========================
            # COUPON FIXED
            # =========================
            if coupon_code:

                coupon = Coupon.objects.filter(
                    code=coupon_code,
                    is_active=True
                ).first()

                if coupon:

                    if coupon.discount_type == "flat":
                        discount_amount = Decimal(str(coupon.discount_value))
                    else:
                        discount_amount = (total_amount * Decimal(str(coupon.discount_value))) / 100

                    if coupon.max_discount_amount:
                        discount_amount = min(
                            discount_amount,
                            Decimal(str(coupon.max_discount_amount))
                        )

                    total_amount -= discount_amount

                    if total_amount < 0:
                        total_amount = Decimal("0.00")

            return Response({
                "status": True,
                "message": "Checkout success",
                "data": {
                    "cart_id": cart.id,
                    "cart_items": cart_items,
                    "coupon_code": coupon_code,
                    "total_amount": float(total_amount + discount_amount),
                    "discount_amount": float(discount_amount),
                    "final_amount": float(total_amount)
                }
            })

        except Exception as e:
            return Response({
                "status": False,
                "message": str(e)
            }, status=500)
            
class BuyNowCheckoutView(APIView):

    def post(self, request):

        try:
            data = request.data.get("buy_now_data")

            if not data:
                return Response({
                    "status": False,
                    "message": "Buy now data missing"
                }, status=400)

            product = Product.objects.get(id=data["product_id"])
            pw = ProductWeight.objects.get(id=data["product_weight_id"])
            qty = int(data.get("quantity", 1))

            price = Decimal(str(pw.price))
            total = price * qty

            return Response({
                "status": True,
                "message": "Buy now success",
                "data": {
                    "cart_id": None,
                    "cart_items": [
                        {
                            "id": 1,
                            "product_id": product.id,
                            "product_name": product.name,
                            "product_weight_id": pw.id,
                            "weight": pw.weight_in_grams,
                            "price": float(price),
                            "quantity": qty,
                            "total_price": float(total)
                        }
                    ],
                    "total_amount": float(total),
                    "discount_amount": 0,
                    "final_amount": float(total)
                }
            })

        except Exception as e:
            return Response({
                "status": False,
                "message": str(e)
            }, status=500)

class CreateOrderView(APIView):

    def post(self, request):

        try:

            guest_id = request.headers.get("guest-id")
            cart_id = request.data.get("cart_id")
            buy_now_data = request.data.get("buy_now_data")
            coupon_code = request.data.get("coupon_code")

            name = request.data.get("name")
            phone = request.data.get("phone")
            email = request.data.get("email")
            street = request.data.get("street")
            city = request.data.get("city")
            pincode = request.data.get("pincode")

            if not all([name, phone, email, street, city, pincode]):
                return Response({
                    "status": False,
                    "message": "Address required"
                }, status=400)

            order_items = []
            final_amount = Decimal("0.00")
            discount_amount = Decimal("0.00")

            # =========================
            # BUY NOW
            # =========================
            if buy_now_data:

                product = Product.objects.get(id=buy_now_data["product_id"])
                pw = ProductWeight.objects.get(id=buy_now_data["product_weight_id"])
                qty = int(buy_now_data["quantity"])

                price = Decimal(str(pw.price))
                total = price * qty

                final_amount = total

                order_items.append({
                    "product": product,
                    "product_weight": pw,
                    "quantity": qty,
                    "price": price,
                    "total_price": total
                })

            # =========================
            # CART
            # =========================
            else:

                cart = Cart.objects.filter(id=cart_id, guest_id=guest_id).first()

                if not cart:
                    return Response({
                        "status": False,
                        "message": "Cart not found"
                    }, status=400)

                items = CartItem.objects.filter(cart=cart)

                if not items.exists():
                    return Response({
                        "status": False,
                        "message": "Cart empty"
                    }, status=400)

                for item in items:

                    pw = item.product_weight
                    price = Decimal(str(pw.price))
                    total = price * item.quantity

                    final_amount += total

                    order_items.append({
                        "product": item.product,
                        "product_weight": pw,
                        "quantity": item.quantity,
                        "price": price,
                        "total_price": total
                    })

            # =========================
            # COUPON FINAL FIX
            # =========================
            if coupon_code:

                coupon = Coupon.objects.filter(
                    code=coupon_code,
                    is_active=True
                ).first()

                if coupon:

                    if coupon.discount_type == "flat":
                        discount_amount = Decimal(str(coupon.discount_value))
                    else:
                        discount_amount = (final_amount * Decimal(str(coupon.discount_value))) / 100

                    if coupon.max_discount_amount:
                        discount_amount = min(
                            discount_amount,
                            Decimal(str(coupon.max_discount_amount))
                        )

                    final_amount -= discount_amount

                    if final_amount < 0:
                        final_amount = Decimal("0.00")

            # =========================
            # RAZORPAY ORDER
            # =========================
            razorpay_order = client.order.create({
                "amount": int(final_amount * 100),
                "currency": "INR",
                "payment_capture": 1
            })

            order = Order.objects.create(
                guest_id=guest_id,
                razorpay_order_id=razorpay_order["id"],
                payment_status="pending",
                coupon_code=coupon_code,
                total_amount=final_amount + discount_amount,
                discount_amount=discount_amount,
                final_amount=final_amount,
                name=name,
                phone=phone,
                email=email,
                street=street,
                city=city,
                pincode=pincode
            )

            for item in order_items:

                OrderItem.objects.create(
                    order=order,
                    product=item["product"],
                    product_weight=item["product_weight"],
                    quantity=item["quantity"],
                    price=item["price"],
                    total_price=item["total_price"]
                )

            return Response({
                "status": True,
                "message": "Order created",
                "data": {
                    "order_id": order.id,
                    "razorpay_order_id": razorpay_order["id"],
                    "amount": int(final_amount * 100),
                    "currency": "INR"
                }
            })

        except Exception as e:
            return Response({
                "status": False,
                "message": str(e)
            }, status=500)
# =========================
# VERIFY PAYMENT
# =========================
class VerifyPaymentView(APIView):

    def post(self, request):

        razorpay_order_id = request.data.get("razorpay_order_id")
        razorpay_payment_id = request.data.get("razorpay_payment_id")
        razorpay_signature = request.data.get("razorpay_signature")

        try:

            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })

            order = Order.objects.get(
                razorpay_order_id=razorpay_order_id
            )

            # =========================
            # UPDATE PAYMENT
            # =========================
            order.payment_status = "paid"
            order.razorpay_payment_id = razorpay_payment_id
            order.save()

            # =========================
            # CREATE TRACKING
            # =========================
            OrderTracking.objects.create(

                order=order,

                customer_name=order.name,

                customer_phone=order.phone,

                customer_email=order.email,

                status="placed",

                message="Your order has been placed successfully."
            )

            # =========================
            # REMOVE CART ITEMS
            # =========================
            try:

                if order.customer:
                    cart = Cart.objects.get(customer=order.customer)
                else:
                    cart = Cart.objects.get(guest_id=order.guest_id)

                cart.items.all().delete()
                cart.coupon = None
                cart.save()

            except:
                pass

            return Response({
                "status": True,
                "message": "Payment Success"
            })

        except Exception as e:

            return Response({
                "status": False,
                "message": str(e)
            })