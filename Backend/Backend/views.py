from django.conf import settings
from django.http import FileResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):
    return FileResponse(
        open(settings.BASE_DIR / 'static' / 'frontend' / 'index.html', 'rb'),
        content_type='text/html',
    )
