from django.urls import path

from . import views


urlpatterns = [

    # LOGIN
    path(
        '',
        views.admin_login,
        name='admin_login'
    ),

    # LOGOUT
    path(
        'logout/',
        views.admin_logout,
        name='admin_logout'
    ),

    # DASHBOARD
    path(
        'dashboard/',
        views.admin_dashboard,
        name='admin_dashboard'
    ),

    # CUSTOMERS
    path(
        'customers/',
        views.customers_list,
        name='customers_list'
    ),

    path(
        'customer-status/<int:cid>/',
        views.toggle_customer_status,
        name='toggle_customer_status'
    ),

    # PRODUCTS
    path(
        'products/',
        views.products_list,
        name='products_list'
    ),

    path(
        'add-product/',
        views.add_product,
        name='add_product'
    ),

    path(
        'edit-product/<int:pid>/',
        views.edit_product,
        name='edit_product'
    ),

    path(
        'delete-product/<int:pid>/',
        views.delete_product,
        name='delete_product'
    ),

    # CATEGORIES
    path(
        'categories/',
        views.categories_list,
        name='categories_list'
    ),

    path(
        'add-category/',
        views.add_category,
        name='add_category'
    ),
    path("categories/edit/<int:cid>/", views.edit_category, name="edit_category"),
path("categories/delete/<int:cid>/", views.delete_category, name="delete_category"),

    # FESTIVALS
    path(
        'festivals/',
        views.festivals_list,
        name='festivals_list'
    ),

    path(
        'add-festival/',
        views.add_festival,
        name='add_festival'
    ),
    path('edit-festival/<int:fid>/', views.edit_festival, name='edit_festival'),
path('delete-festival/<int:fid>/', views.delete_festival, name='delete_festival'),

    # ORDERS
    path(
        'orders/',
        views.orders_list,
        name='orders_list'
    ),

    path(
        'payment-status/<int:oid>/<str:status>/',
        views.update_payment_status,
        name='update_payment_status'
    ),

    # TRACKING
    path(
        'tracking/',
        views.tracking_list,
        name='tracking_list'
    ),

    path(
        'tracking-status/<int:tid>/<str:status>/',
        views.update_tracking_status,
        name='update_tracking_status'
    ),
]