from django.urls import path
from .views import (
    CartView,
    AddToCartView,
    UpdateCartItemView,
    RemoveCartItemView,
    UpdateCartQtyView,
    CheckoutView,
    ApplyCouponView,
    # OrderListView,
    # OrderDetailView
)

urlpatterns = [

  path('', CartView.as_view(), name="cart"),

    # ADD ITEM
    path('add/', AddToCartView.as_view(), name="cart-add"),

    # UPDATE ITEM (weight change)
    path('update/', UpdateCartItemView.as_view(), name="cart-update"),

    # UPDATE QTY (✔ FIXED)
    path('update-qty/', UpdateCartQtyView.as_view(), name="cart-update-qty"),

    # REMOVE ITEM
    path('remove/<int:item_id>/', RemoveCartItemView.as_view(), name="cart-remove"),
    path('checkout/', CheckoutView.as_view(), name="checkout"),
    
    path("apply-coupon/", ApplyCouponView.as_view(), name="apply-coupon"),

   
]