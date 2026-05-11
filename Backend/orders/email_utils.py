from django.core.mail import send_mail
from django.conf import settings


def send_order_confirmation_email(order):

    items_text = ""

    for item in order.items.all():

        items_text += (
            f"{item.product.name} "
            f"({item.quantity} Qty) - "
            f"₹{item.total_price}\n"
        )

    subject = f"Pickle Bowl Order Confirmation #{order.id}"

    message = f"""
Hello {order.name},

Your payment was successful.

Order Details
----------------------------

Order ID: {order.id}

Phone: {order.phone}

Payment Status: {order.payment_status}

Products:
{items_text}

Total Amount: ₹{order.final_amount}

Delivery Address:
{order.street},
{order.city},
{order.pincode}

Thank you for shopping with Pickle Bowl.
"""

    send_mail(

        subject,

        message,

        settings.EMAIL_HOST_USER,

        [order.email],

        fail_silently=False
    )