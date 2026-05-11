from rest_framework.views import APIView
from rest_framework.response import Response

from orders.models import Order

from .models import OrderTracking
from .serializers import OrderTrackingSerializer


class TrackOrderView(APIView):

    def post(self, request):

        order_id = request.data.get("order_id")
        phone = request.data.get("phone")

        # =========================
        # VALIDATION
        # =========================
        if not order_id or not phone:

            return Response({
                "status": False,
                "message": "Order ID and phone required"
            }, status=400)

        # =========================
        # FIND ORDER
        # =========================
        order = Order.objects.filter(

            id=order_id,

            phone=phone

        ).first()

        if not order:

            return Response({
                "status": False,
                "message": "Order not found"
            }, status=404)

        # =========================
        # TRACKING HISTORY
        # =========================
        tracking = OrderTracking.objects.filter(
            order=order
        )

        serializer = OrderTrackingSerializer(
            tracking,
            many=True
        )

        # =========================
        # RESPONSE
        # =========================
        return Response({

            "status": True,

            "message": "Tracking details fetched",

            "data": {

                "order_id": order.id,

                "customer_name": order.name,

                "phone": order.phone,

                "email": order.email,

                "payment_status": order.payment_status,

                "final_amount": order.final_amount,

                "created_at": order.created_at,

                "tracking_history": serializer.data
            }
        })