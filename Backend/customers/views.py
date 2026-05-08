import jwt

from django.conf import settings
from django.contrib.auth.hashers import (
    make_password,
    check_password
)

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Customer

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ProfileSerializer,
    ChangePasswordSerializer,
)


# =========================================
# CREATE JWT TOKENS
# =========================================

def get_tokens(customer):

    refresh = RefreshToken()

    refresh["customer_id"] = customer.id

    access = refresh.access_token
    access["customer_id"] = customer.id

    return {
        "refresh": str(refresh),
        "access": str(access),
    }


# =========================================
# GET CUSTOMER FROM TOKEN
# =========================================

def get_customer_from_token(request):

    try:

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )

        customer_id = decoded.get("customer_id")

        if not customer_id:
            return None

        customer = Customer.objects.get(
            id=customer_id
        )

        return customer

    except Exception:
        return None


# =========================================
# REGISTER
# =========================================

class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response({
                "status": True,
                "message": "Registration successful"
            })

        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=400)


# =========================================
# LOGIN
# =========================================

class LoginView(APIView):

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        if serializer.is_valid():

            customer = serializer.validated_data[
                "customer"
            ]

            tokens = get_tokens(customer)

            return Response({
                "status": True,
                "message": "Login successful",

                "user_id": customer.id,

                "access": tokens["access"],
                "refresh": tokens["refresh"],
            })

        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=400)


# =========================================
# PROFILE
# =========================================

class ProfileView(APIView):

    def get(self, request):

        customer = get_customer_from_token(
            request
        )

        if not customer:

            return Response({
                "status": False,
                "message": "Unauthorized"
            }, status=401)

        serializer = ProfileSerializer(
            customer
        )

        return Response({
            "status": True,
            "data": serializer.data
        })

    def put(self, request):

        customer = get_customer_from_token(
            request
        )

        if not customer:

            return Response({
                "status": False,
                "message": "Unauthorized"
            }, status=401)

        serializer = ProfileSerializer(
            customer,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response({
                "status": True,
                "message": "Profile updated",
                "data": serializer.data
            })

        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=400)


# =========================================
# CHANGE PASSWORD
# =========================================

class ChangePasswordView(APIView):

    def post(self, request):

        customer = get_customer_from_token(
            request
        )

        if not customer:

            return Response({
                "status": False,
                "message": "Unauthorized"
            }, status=401)

        serializer = ChangePasswordSerializer(
            data=request.data
        )

        if serializer.is_valid():

            old_password = serializer.validated_data[
                "old_password"
            ]

            if not check_password(
                old_password,
                customer.password
            ):

                return Response({
                    "status": False,
                    "message": "Old password incorrect"
                }, status=400)

            customer.password = make_password(
                serializer.validated_data[
                    "new_password"
                ]
            )

            customer.save()

            return Response({
                "status": True,
                "message": "Password updated successfully"
            })

        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=400)