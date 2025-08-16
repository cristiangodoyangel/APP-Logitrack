"""
ASGI config for logitrack project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "logitrack.settings")

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    # Futuro: cuando tengas WebSockets, aquí se agregan las rutas
    # "websocket": AuthMiddlewareStack(
    #     URLRouter(
    #         yourapp.routing.websocket_urlpatterns
    #     )
    # ),
})
