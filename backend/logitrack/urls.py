# logitrack/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),  # rutas de autenticación
    path('api/', include('pedidos.urls')),        # incluye todas las rutas de pedidos
]
