from django.urls import path

from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    ChangePasswordView,
)

urlpatterns = [

    # AUTH
    path(
        "register/",
        RegisterView.as_view(),
    ),

    path(
        "login/",
        LoginView.as_view(),
    ),

    # PROFILE
    path(
        "profile/",
        ProfileView.as_view(),
    ),

    # CHANGE PASSWORD
    path(
        "change-password/",
        ChangePasswordView.as_view(),
    ),
]