from rest_framework import serializers

from .models import (
    Category,
    Product,
    ProductWeight,
    Festival,
    FestivalProduct
)


# -----------------------
# PRODUCT WEIGHT
# -----------------------
class ProductWeightSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductWeight

        fields = [
            "id",
            "weight_in_grams",
            "price",
            "stock",
            "is_available",
        ]


# -----------------------
# CATEGORY
# -----------------------
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category

        fields = "__all__"


# -----------------------
# PRODUCT
# -----------------------
class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(
        read_only=True
    )

    # 🔥 ALL WEIGHTS
    weights = ProductWeightSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Product

        fields = [
            "id",
            "category",
            "name",
            "slug",
            "price_per_kg",
            "rating",
            "image",
            "description",
            "is_festival_offer",
            "is_popular",
            "weights",
            "created_at",
            "updated_at",
        ]


# -----------------------
# FESTIVAL
# -----------------------
class FestivalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Festival

        fields = "__all__"


# -----------------------
# FESTIVAL PRODUCT
# -----------------------
class FestivalProductSerializer(serializers.ModelSerializer):

    product = ProductSerializer(
        read_only=True
    )

    festival = FestivalSerializer(
        read_only=True
    )

    class Meta:
        model = FestivalProduct

        fields = "__all__"