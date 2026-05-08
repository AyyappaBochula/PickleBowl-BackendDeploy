from rest_framework import generics

from .models import (
    Category,
    Product,
    ProductWeight,
    Festival,
    FestivalProduct
)

from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductWeightSerializer,
    FestivalSerializer,
    FestivalProductSerializer
)


# -----------------------
# CATEGORY APIs
# -----------------------
class CategoryListView(generics.ListAPIView):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveAPIView):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    lookup_field = "slug"


# -----------------------
# PRODUCT APIs
# -----------------------
class ProductListView(generics.ListAPIView):

    queryset = Product.objects.prefetch_related(
        "weights"
    ).all().order_by("-created_at")

    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveAPIView):

    queryset = Product.objects.prefetch_related(
        "weights"
    ).all()

    serializer_class = ProductSerializer

    lookup_field = "id"


# -----------------------
# POPULAR PRODUCTS
# -----------------------
class PopularProductsView(generics.ListAPIView):

    serializer_class = ProductSerializer

    def get_queryset(self):

        return Product.objects.filter(
            is_popular=True
        ).prefetch_related(
            "weights"
        ).order_by("-updated_at")


# -----------------------
# CATEGORY PRODUCTS
# -----------------------
class CategoryProductsView(generics.ListAPIView):

    serializer_class = ProductSerializer

    def get_queryset(self):

        slug = self.kwargs["slug"]

        return Product.objects.filter(
            category__slug=slug
        ).prefetch_related(
            "weights"
        ).order_by("-updated_at")


# -----------------------
# PRODUCT WEIGHTS
# -----------------------
class ProductWeightListView(generics.ListAPIView):

    serializer_class = ProductWeightSerializer

    def get_queryset(self):

        product_id = self.kwargs["product_id"]

        return ProductWeight.objects.filter(
            product_id=product_id,
            is_available=True
        ).order_by("weight_in_grams")


# -----------------------
# FESTIVAL APIs
# -----------------------
class FestivalListView(generics.ListAPIView):

    queryset = Festival.objects.all()

    serializer_class = FestivalSerializer


class FestivalProductListView(generics.ListAPIView):

    queryset = FestivalProduct.objects.all()

    serializer_class = FestivalProductSerializer


class FestivalOfferProductsView(generics.ListAPIView):

    serializer_class = ProductSerializer

    def get_queryset(self):

        festival_products = FestivalProduct.objects.values_list(
            "product_id",
            flat=True
        )

        return Product.objects.filter(
            id__in=festival_products
        ).prefetch_related(
            "weights"
        ).order_by("-updated_at")