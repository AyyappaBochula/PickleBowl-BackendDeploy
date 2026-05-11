from django.core.mail import send_mail
from django.conf import settings


def send_tracking_update_email(tracking):

    order = tracking.order

    subject = f"Pickle Bowl Order Update #{order.id}"

    message = f"""
Hello {tracking.customer_name},

Your order status has been updated.

-----------------------------------

Order ID:
{order.id}

Current Status:
{tracking.status}

Message:
{tracking.message}

Payment Status:
{order.payment_status}

Products:
"""

    for item in order.items.all():

        message += (
            f"\n- {item.product.name} "
            f"({item.quantity} Qty)"
            f" - ₹{item.total_price}"
        )

    message += f"""

-----------------------------------

Total Amount:
₹{order.final_amount}

Delivery Address:
{order.street},
{order.city},
{order.pincode}

Phone:
{tracking.customer_phone}

Thank you for shopping with Pickle Bowl.
"""

    send_mail(

        subject,

        message,

        settings.EMAIL_HOST_USER,

        [tracking.customer_email],

        fail_silently=False
    )