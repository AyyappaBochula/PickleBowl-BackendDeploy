from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password

from .models import Customer


# REGISTER
class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = Customer

        fields = [
            "name",
            "mobile",
            "email",
            "password",
            "confirm_password",
            "street",
            "village",
            "district",
            "state",
            "pincode",
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):

        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match"
            })

        if Customer.objects.filter(mobile=data["mobile"]).exists():
            raise serializers.ValidationError({
                "mobile": "Mobile already exists"
            })

        return data

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        validated_data["password"] = make_password(
            validated_data["password"]
        )

        return Customer.objects.create(**validated_data)


# LOGIN
class LoginSerializer(serializers.Serializer):

    mobile = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):

        try:
            customer = Customer.objects.get(
                mobile=data["mobile"]
            )

        except Customer.DoesNotExist:
            raise serializers.ValidationError({
                "mobile": "Customer not found"
            })

        if not check_password(
            data["password"],
            customer.password
        ):
            raise serializers.ValidationError({
                "password": "Invalid password"
            })

        data["customer"] = customer

        return data


# PROFILE
class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer

        fields = [
            "id",
            "name",
            "mobile",
            "email",
            "street",
            "village",
            "district",
            "state",
            "pincode",
        ]

        read_only_fields = ["id", "mobile"]


# CHANGE PASSWORD
class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField()

    new_password = serializers.CharField()

    confirm_password = serializers.CharField()

    def validate(self, data):

        if data["new_password"] != data["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Passwords do not match"
            })

        return data