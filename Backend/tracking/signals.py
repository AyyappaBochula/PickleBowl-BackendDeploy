# from django.db.models.signals import post_save
# from django.dispatch import receiver

# from .models import OrderTracking
# from .email_utils import send_tracking_update_email


# @receiver(post_save, sender=OrderTracking)
# def tracking_email_signal(sender, instance, created, **kwargs):

#     # =========================
#     # SEND EMAIL ONLY NEW TRACKING
#     # =========================
#     if created:

#         try:

#             send_tracking_update_email(instance)

#             instance.email_sent = True
#             instance.save(update_fields=["email_sent"])

#         except Exception as e:

#             print("TRACKING EMAIL ERROR:", e)

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from .models import OrderTracking
from .email_utils import send_tracking_update_email


# =====================================
# STORE OLD STATUS
# =====================================
@receiver(pre_save, sender=OrderTracking)
def store_old_status(sender, instance, **kwargs):

    if instance.pk:

        old = OrderTracking.objects.get(pk=instance.pk)

        instance.old_status = old.status

    else:

        instance.old_status = None


# =====================================
# SEND TRACKING EMAIL
# =====================================
@receiver(post_save, sender=OrderTracking)
def tracking_email_signal(sender, instance, created, **kwargs):

    try:

        # =====================================
        # ONLY SEND FOR THESE STATUS
        # =====================================
        allowed_status = [

            "confirmed",

            "shipped",

            "out_for_delivery",

            "delivered",

            "cancelled"
        ]

        should_send = False

        # =====================================
        # NEW TRACKING CREATED
        # =====================================
        if created and instance.status in allowed_status:

            should_send = True

        # =====================================
        # STATUS UPDATED
        # =====================================
        elif (
            hasattr(instance, "old_status")
            and instance.old_status != instance.status
            and instance.status in allowed_status
        ):

            should_send = True

        # =====================================
        # SEND EMAIL
        # =====================================
        if should_send:

            send_tracking_update_email(instance)

            if not instance.email_sent:

                instance.email_sent = True

                instance.save(update_fields=["email_sent"])

    except Exception as e:

        print("TRACKING EMAIL ERROR:", e)