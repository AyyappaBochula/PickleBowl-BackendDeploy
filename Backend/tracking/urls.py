from django.urls import path

from .views import TrackOrderView


urlpatterns = [

    path(
        "track/",
        TrackOrderView.as_view()
    ),
]