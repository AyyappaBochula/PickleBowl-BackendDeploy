# from django.shortcuts import (
#     render,
#     redirect,
#     get_object_or_404
# )

# from django.contrib import messages

# from .models import AdminUser

# from customers.models import Customer

# from products.models import (
#     Product,
#     Category,
#     Festival
# )

# from orders.models import Order

# from tracking.models import OrderTracking


# # =========================================
# # LOGIN REQUIRED
# # =========================================
# # def check_admin(request):

# #     return request.session.get("admin_id")
# def admin_login(request):

#     if request.method == "POST":

#         mobile = request.POST.get("mobile")

#         password = request.POST.get("password")

#         try:

#             admin = AdminUser.objects.get(
#                 mobile=mobile,
#                 password=password,
#                 is_active=True
#             )

#             request.session["admin_id"] = admin.id

#             request.session["admin_name"] = admin.name

#             request.session["admin_role"] = admin.role

#             return redirect("admin_dashboard")

#         except:

#             messages.error(
#                 request,
#                 "Invalid Mobile or Password"
#             )

#     return render(
#         request,
#         "adminpanel/login.html"
#     )

# # =========================================
# # LOGIN
# # =========================================
# # def admin_login(request):

# #     if check_admin(request):

# #         return redirect("admin_dashboard")

# #     if request.method == "POST":

# #         mobile = request.POST.get("mobile")

# #         password = request.POST.get("password")

# #         try:

# #             admin = AdminUser.objects.get(
# #                 mobile=mobile,
# #                 password=password,
# #                 is_active=True
# #             )

# #             request.session["admin_id"] = admin.id

# #             request.session["admin_name"] = admin.name

# #             request.session["admin_role"] = admin.role

# #             return redirect("admin_dashboard")

# #         except:

# #             messages.error(
# #                 request,
# #                 "Invalid Mobile or Password"
# #             )

# #     return render(
# #         request,
# #         "adminpanel/login.html"
# #     )


# # =========================================
# # LOGOUT
# # =========================================
# def admin_logout(request):

#     request.session.flush()

#     return redirect("admin_login")


# # =========================================
# # DASHBOARD
# # =========================================
# def admin_dashboard(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     context = {

#         "total_customers":
#         Customer.objects.count(),

#         "total_products":
#         Product.objects.count(),

#         "total_categories":
#         Category.objects.count(),

#         "total_orders":
#         Order.objects.count(),

#         "total_festivals":
#         Festival.objects.count(),
#     }

#     return render(
#         request,
#         "adminpanel/dashboard.html",
#         context
#     )


# # =========================================
# # CUSTOMERS
# # =========================================
# def customers_list(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     customers = Customer.objects.all().order_by("-id")

#     return render(
#         request,
#         "adminpanel/customers.html",
#         {
#             "customers": customers
#         }
#     )


# # =========================================
# # CUSTOMER STATUS
# # =========================================
# def toggle_customer_status(request, cid):

#     if not check_admin(request):

#         return redirect("admin_login")

#     customer = get_object_or_404(
#         Customer,
#         id=cid
#     )

#     customer.is_active = not customer.is_active

#     customer.save()

#     return redirect("customers_list")


# # =========================================
# # PRODUCTS
# # =========================================
# def products_list(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     products = Product.objects.all().order_by("-id")

#     return render(
#         request,
#         "adminpanel/products.html",
#         {
#             "products": products
#         }
#     )


# # =========================================
# # ADD PRODUCT
# # =========================================
# def add_product(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     categories = Category.objects.all()

#     if request.method == "POST":

#         category_id = request.POST.get("category")

#         category = Category.objects.get(
#             id=category_id
#         )

#         Product.objects.create(

#             category=category,

#             name=request.POST.get("name"),

#             price_per_kg=request.POST.get("price"),

#             rating=request.POST.get("rating"),

#             description=request.POST.get("description"),

#             image=request.FILES.get("image"),

#             is_popular=True if request.POST.get("is_popular") else False,

#             is_festival_offer=True if request.POST.get("is_festival_offer") else False,
#         )

#         messages.success(
#             request,
#             "Product Added Successfully"
#         )

#         return redirect("products_list")

#     return render(
#         request,
#         "adminpanel/add_product.html",
#         {
#             "categories": categories
#         }
#     )


# # =========================================
# # EDIT PRODUCT
# # =========================================
# def edit_product(request, pid):

#     if not check_admin(request):

#         return redirect("admin_login")

#     product = get_object_or_404(
#         Product,
#         id=pid
#     )

#     categories = Category.objects.all()

#     if request.method == "POST":

#         category_id = request.POST.get("category")

#         product.category = Category.objects.get(
#             id=category_id
#         )

#         product.name = request.POST.get("name")

#         product.price_per_kg = request.POST.get("price")

#         product.rating = request.POST.get("rating")

#         product.description = request.POST.get("description")

#         product.is_popular = True if request.POST.get("is_popular") else False

#         product.is_festival_offer = True if request.POST.get("is_festival_offer") else False

#         if request.FILES.get("image"):

#             product.image = request.FILES.get("image")

#         product.save()

#         messages.success(
#             request,
#             "Product Updated"
#         )

#         return redirect("products_list")

#     return render(
#         request,
#         "adminpanel/edit_product.html",
#         {
#             "product": product,
#             "categories": categories
#         }
#     )


# # =========================================
# # DELETE PRODUCT
# # =========================================
# def delete_product(request, pid):

#     if not check_admin(request):

#         return redirect("admin_login")

#     product = get_object_or_404(
#         Product,
#         id=pid
#     )

#     product.delete()

#     return redirect("products_list")


# # =========================================
# # CATEGORIES
# # =========================================
# def categories_list(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     categories = Category.objects.all().order_by("-id")

#     return render(
#         request,
#         "adminpanel/categories.html",
#         {
#             "categories": categories
#         }
#     )


# # =========================================
# # ADD CATEGORY
# # =========================================
# def add_category(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     if request.method == "POST":

#         Category.objects.create(

#             name=request.POST.get("name"),

#             image=request.FILES.get("image"),

#             is_festival=True if request.POST.get("is_festival") else False,
#         )

#         return redirect("categories_list")

#     return render(
#         request,
#         "adminpanel/add_category.html"
#     )


# # =========================================
# # FESTIVALS
# # =========================================
# def festivals_list(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     festivals = Festival.objects.all().order_by("-id")

#     return render(
#         request,
#         "adminpanel/festivals.html",
#         {
#             "festivals": festivals
#         }
#     )


# # =========================================
# # ADD FESTIVAL
# # =========================================
# def add_festival(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     if request.method == "POST":

#         Festival.objects.create(

#             name=request.POST.get("name"),

#             image=request.FILES.get("image"),

#             start_date=request.POST.get("start_date"),

#             end_date=request.POST.get("end_date"),
#         )

#         return redirect("festivals_list")

#     return render(
#         request,
#         "adminpanel/add_festival.html"
#     )


# # =========================================
# # ORDERS
# # =========================================
# def orders_list(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     orders = Order.objects.all().order_by("-id")

#     return render(
#         request,
#         "adminpanel/orders.html",
#         {
#             "orders": orders
#         }
#     )


# # =========================================
# # UPDATE PAYMENT STATUS
# # =========================================
# def update_payment_status(request, oid, status):

#     if not check_admin(request):

#         return redirect("admin_login")

#     order = get_object_or_404(
#         Order,
#         id=oid
#     )

#     order.payment_status = status

#     order.save()

#     return redirect("orders_list")


# # =========================================
# # TRACKING
# # =========================================
# def tracking_list(request):

#     if not check_admin(request):

#         return redirect("admin_login")

#     tracking = OrderTracking.objects.all().order_by("-id")

#     return render(
#         request,
#         "adminpanel/tracking.html",
#         {
#             "tracking": tracking
#         }
#     )


# # =========================================
# # UPDATE TRACKING STATUS
# # =========================================
# def update_tracking_status(request, tid, status):

#     if not check_admin(request):

#         return redirect("admin_login")

#     tracking = get_object_or_404(
#         OrderTracking,
#         id=tid
#     )

#     tracking.status = status

#     tracking.save()

#     return redirect("tracking_list")


from django.shortcuts import (
    render,
    redirect,
    get_object_or_404
)

from django.contrib import messages
from django.contrib.auth.hashers import check_password

from .models import AdminUser

from customers.models import Customer

from products.models import (
    Product,
    Category,
    Festival
)

from orders.models import Order

from tracking.models import OrderTracking


# =========================================
# CHECK ADMIN LOGIN
# =========================================
def check_admin(request):

    return request.session.get("admin_id")


# =========================================
# LOGIN
# =========================================
def admin_login(request):

    if request.method == "POST":

        mobile = request.POST.get("mobile")

        password = request.POST.get("password")

        try:

            admin = AdminUser.objects.get(mobile=mobile, is_active=True)

            if not check_password(password, admin.password):
                raise AdminUser.DoesNotExist

            request.session["admin_id"] = admin.id

            request.session["admin_name"] = admin.name

            request.session["admin_role"] = admin.role

            return redirect("admin_dashboard")

        except AdminUser.DoesNotExist:

            messages.error(
                request,
                "Invalid Mobile or Password"
            )

    return render(
        request,
        "adminpanel/login.html"
    )


# =========================================
# LOGOUT
# =========================================
def admin_logout(request):

    request.session.flush()

    return redirect("admin_login")


# =========================================
# DASHBOARD
# =========================================
def admin_dashboard(request):

    if not check_admin(request):

        return redirect("admin_login")

    context = {

        "total_customers":
        Customer.objects.count(),

        "total_products":
        Product.objects.count(),

        "total_categories":
        Category.objects.count(),

        "total_orders":
        Order.objects.count(),

        "total_festivals":
        Festival.objects.count(),
    }

    return render(
        request,
        "adminpanel/dashboard.html",
        context
    )


# =========================================
# CUSTOMERS
# =========================================
def customers_list(request):

    customers = Customer.objects.all().order_by("-id")

    active_customers_count = customers.filter(
        is_active=True
    ).count()

    inactive_customers_count = customers.filter(
        is_active=False
    ).count()

    context = {

        "customers": customers,

        "active_customers_count":
        active_customers_count,

        "inactive_customers_count":
        inactive_customers_count,

    }

    return render(
        request,
        "adminpanel/customers.html",
        context
    )


# =========================================
# CUSTOMER STATUS
# =========================================
def toggle_customer_status(request, cid):

    if not check_admin(request):

        return redirect("admin_login")

    customer = get_object_or_404(
        Customer,
        id=cid
    )

    customer.is_active = not customer.is_active

    customer.save()

    return redirect("customers_list")


# =========================================
# PRODUCTS
# =========================================
def products_list(request):

    if not check_admin(request):
        return redirect("admin_login")

    # STEP 1: get all products
    products = Product.objects.all().order_by("-id")

    # STEP 2: get all categories for dropdown
    categories = Category.objects.all()

    # STEP 3: read filter value from URL (?category=1)
    category_id = request.GET.get("category")

    # STEP 4: apply filter if selected
    if category_id and category_id != "":
        products = products.filter(category_id=category_id)

    # STEP 5: send both products + categories to template
    return render(
        request,
        "adminpanel/products.html",
        {
            "products": products,
            "categories": categories
        }
    )
# =========================================
# ADD PRODUCT
# =========================================
def add_product(request):

    if not check_admin(request):

        return redirect("admin_login")

    categories = Category.objects.all()

    if request.method == "POST":

        category_id = request.POST.get("category")

        category = Category.objects.get(
            id=category_id
        )

        Product.objects.create(

            category=category,

            name=request.POST.get("name"),

            price_per_kg=request.POST.get("price"),

            rating=request.POST.get("rating"),

            description=request.POST.get("description"),

            image=request.FILES.get("image"),

            is_popular=True if request.POST.get("is_popular") else False,

            is_festival_offer=True if request.POST.get("is_festival_offer") else False,
        )

        messages.success(
            request,
            "Product Added Successfully"
        )

        return redirect("products_list")

    return render(
        request,
        "adminpanel/add_product.html",
        {
            "categories": categories
        }
    )


# =========================================
# EDIT PRODUCT
# =========================================
def edit_product(request, pid):

    if not check_admin(request):

        return redirect("admin_login")

    product = get_object_or_404(
        Product,
        id=pid
    )

    categories = Category.objects.all()

    if request.method == "POST":

        category_id = request.POST.get("category")

        product.category = Category.objects.get(
            id=category_id
        )

        product.name = request.POST.get("name")

        product.price_per_kg = request.POST.get("price")

        product.rating = request.POST.get("rating")

        product.description = request.POST.get("description")

        product.is_popular = True if request.POST.get("is_popular") else False

        product.is_festival_offer = True if request.POST.get("is_festival_offer") else False

        if request.FILES.get("image"):

            product.image = request.FILES.get("image")

        product.save()

        messages.success(
            request,
            "Product Updated Successfully"
        )

        return redirect("products_list")

    return render(
        request,
        "adminpanel/edit_product.html",
        {
            "product": product,
            "categories": categories
        }
    )


# =========================================
# DELETE PRODUCT
# =========================================
def delete_product(request, pid):

    if not check_admin(request):

        return redirect("admin_login")

    product = get_object_or_404(
        Product,
        id=pid
    )

    product.delete()

    messages.success(
        request,
        "Product Deleted Successfully"
    )

    return redirect("products_list")


# =========================================
# CATEGORIES
# =========================================
def categories_list(request):

    if not check_admin(request):

        return redirect("admin_login")

    categories = Category.objects.all().order_by("-id")

    return render(
        request,
        "adminpanel/categories.html",
        {
            "categories": categories
        }
    )


# =========================================
# ADD CATEGORY
# =========================================
def add_category(request):

    if not check_admin(request):

        return redirect("admin_login")

    if request.method == "POST":

        Category.objects.create(

            name=request.POST.get("name"),

            image=request.FILES.get("image"),

            is_festival=True if request.POST.get("is_festival") else False,
        )

        messages.success(
            request,
            "Category Added Successfully"
        )

        return redirect("categories_list")

    return render(
        request,
        "adminpanel/add_category.html"
    )

def edit_category(request, cid):

    if not check_admin(request):
        return redirect("admin_login")

    category = get_object_or_404(Category, id=cid)

    if request.method == "POST":

        category.name = request.POST.get("name")

        category.is_festival = True if request.POST.get("is_festival") else False

        if request.FILES.get("image"):
            category.image = request.FILES.get("image")

        category.save()

        messages.success(request, "Category Updated Successfully")

        return redirect("categories_list")

    return render(
        request,
        "adminpanel/edit_category.html",
        {"category": category}
    )

def delete_category(request, cid):

    if not check_admin(request):
        return redirect("admin_login")

    category = get_object_or_404(Category, id=cid)

    category.delete()

    messages.success(request, "Category Deleted Successfully")

    return redirect("categories_list")
# =========================================
# FESTIVALS
# =========================================
def festivals_list(request):

    if not check_admin(request):

        return redirect("admin_login")

    festivals = Festival.objects.all().order_by("-id")

    return render(
        request,
        "adminpanel/festivals.html",
        {
            "festivals": festivals
        }
    )


# =========================================
# ADD FESTIVAL
# =========================================
def add_festival(request):

    if not check_admin(request):

        return redirect("admin_login")

    if request.method == "POST":

        Festival.objects.create(

            name=request.POST.get("name"),

            image=request.FILES.get("image"),

            start_date=request.POST.get("start_date"),

            end_date=request.POST.get("end_date"),
        )

        messages.success(
            request,
            "Festival Added Successfully"
        )

        return redirect("festivals_list")

    return render(
        request,
        "adminpanel/add_festival.html"
    )

# EDIT FESTIVAL
def edit_festival(request, fid):

    if not check_admin(request):
        return redirect("admin_login")

    festival = get_object_or_404(Festival, id=fid)

    if request.method == "POST":

        festival.name = request.POST.get("name")
        festival.start_date = request.POST.get("start_date")
        festival.end_date = request.POST.get("end_date")

        if request.FILES.get("image"):
            festival.image = request.FILES.get("image")

        festival.save()

        messages.success(request, "Festival Updated Successfully")

        return redirect("festivals_list")

    return render(request, "adminpanel/edit_festival.html", {
        "festival": festival
    })


# DELETE FESTIVAL
def delete_festival(request, fid):

    if not check_admin(request):
        return redirect("admin_login")

    festival = get_object_or_404(Festival, id=fid)
    festival.delete()

    messages.success(request, "Festival Deleted Successfully")

    return redirect("festivals_list")

# =========================================
# ORDERS
# =========================================
def orders_list(request):

    if not check_admin(request):

        return redirect("admin_login")

    orders = Order.objects.all().order_by("-id")

    return render(
        request,
        "adminpanel/orders.html",
        {
            "orders": orders
        }
    )


# =========================================
# UPDATE PAYMENT STATUS
# =========================================
def update_payment_status(request, oid, status):

    if not check_admin(request):

        return redirect("admin_login")

    order = get_object_or_404(
        Order,
        id=oid
    )

    order.payment_status = status

    order.save()

    messages.success(
        request,
        "Payment Status Updated"
    )

    return redirect("orders_list")


# =========================================
# TRACKING
# =========================================
def tracking_list(request):

    if not check_admin(request):

        return redirect("admin_login")

    tracking = OrderTracking.objects.all().order_by("-id")

    return render(
        request,
        "adminpanel/tracking.html",
        {
            "tracking": tracking
        }
    )


# =========================================
# UPDATE TRACKING STATUS
# =========================================
def update_tracking_status(request, tid, status):

    if not check_admin(request):

        return redirect("admin_login")

    tracking = get_object_or_404(
        OrderTracking,
        id=tid
    )

    tracking.status = status

    tracking.save()

    messages.success(
        request,
        "Tracking Status Updated"
    )

    return redirect("tracking_list")