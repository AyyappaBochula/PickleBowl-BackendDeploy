from django.contrib import admin

from .models import (
    Category,
    Product,
    ProductWeight,
    Festival,
    FestivalProduct
)


# -----------------------
# PRODUCT WEIGHT INLINE
# -----------------------
class ProductWeightInline(admin.TabularInline):

    model = ProductWeight

    extra = 1

    fields = (
        "weight_in_grams",
        "price",
        "stock",
        "is_available",
    )


# -----------------------
# CATEGORY ADMIN
# -----------------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "slug",
        "is_festival",
        "created_at"
    )

    search_fields = (
        "name",
        "slug"
    )

    list_filter = (
        "is_festival",
        "created_at"
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    ordering = ("-created_at",)


# -----------------------
# PRODUCT ADMIN
# -----------------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "category",
        "price_per_kg",
        "rating",
        "is_festival_offer",
        "is_popular",
        "created_at",
    )

    search_fields = (
        "name",
        "slug",
        "category__name"
    )

    list_filter = (
        "category",
        "is_festival_offer",
        "is_popular",
        "rating",
        "created_at"
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    ordering = ("-created_at",)

    list_editable = (
        "price_per_kg",
        "rating",
        "is_festival_offer",
        "is_popular"
    )

    # 🔥 ADD WEIGHTS INSIDE PRODUCT ADMIN
    inlines = [ProductWeightInline]


# -----------------------
# PRODUCT WEIGHT ADMIN
# -----------------------
@admin.register(ProductWeight)
class ProductWeightAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "product",
        "weight_in_grams",
        "price",
        "stock",
        "is_available",
    )

    search_fields = (
        "product__name",
    )

    list_filter = (
        "is_available",
    )

    ordering = (
        "product",
        "weight_in_grams"
    )


# -----------------------
# FESTIVAL ADMIN
# -----------------------
@admin.register(Festival)
class FestivalAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "start_date",
        "end_date"
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "start_date",
        "end_date"
    )


# -----------------------
# FESTIVAL PRODUCT ADMIN
# -----------------------
@admin.register(FestivalProduct)
class FestivalProductAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "festival",
        "product",
        "discount_price"
    )

    search_fields = (
        "festival__name",
        "product__name"
    )

    list_filter = (
        "festival",
    )