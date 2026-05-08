from django.urls import path

from .views import (
    CategoryListView,
    CategoryDetailView,

    ProductListView,
    ProductDetailView,

    PopularProductsView,
    CategoryProductsView,

    ProductWeightListView,

    FestivalListView,
    FestivalProductListView,
    FestivalOfferProductsView,
)

urlpatterns = [

    # -----------------------
    # CATEGORY APIs
    # -----------------------
    path(
        "categories/",
        CategoryListView.as_view()
    ),

    path(
        "categories/<slug:slug>/",
        CategoryDetailView.as_view()
    ),


    # -----------------------
    # PRODUCT APIs
    # -----------------------
    path(
        "",
        ProductListView.as_view()
    ),

    path(
        "<int:id>/",
        ProductDetailView.as_view()
    ),

    path(
        "popular/",
        PopularProductsView.as_view()
    ),

    path(
        "category/<slug:slug>/",
        CategoryProductsView.as_view()
    ),

    path(
        "<int:product_id>/weights/",
        ProductWeightListView.as_view()
    ),


    # -----------------------
    # FESTIVAL APIs
    # -----------------------
    path(
        "festivals/",
        FestivalListView.as_view()
    ),

    path(
        "festival-products/",
        FestivalProductListView.as_view()
    ),

    path(
        "festival-offers/",
        FestivalOfferProductsView.as_view()
    ),
]