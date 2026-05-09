from django.urls import path

from .views import (
    CreateOrderView,
    VerifyPaymentView,
    CartCheckoutView,
    BuyNowCheckoutView
)

urlpatterns = [

    # =========================
    # CART CHECKOUT (coupon + totals)
    # =========================
    path(
        "cart/checkout/",
        CartCheckoutView.as_view(),
        name="cart-checkout"
    ),

    # =========================
    # BUY NOW CHECKOUT
    # =========================
    path(
        "buy-now/checkout/",
        BuyNowCheckoutView.as_view(),
        name="buy-now-checkout"
    ),

    # =========================
    # CREATE ORDER + RAZORPAY
    # =========================
    path(
        "create/",
        CreateOrderView.as_view(),
        name="create-order"
    ),

    # =========================
    # VERIFY PAYMENT
    # =========================
    path(
        "verify-payment/",
        VerifyPaymentView.as_view(),
        name="verify-payment"
    ),

]