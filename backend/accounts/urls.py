# accounts/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView
from .views_protected import ProtectedHelloView  # 👈 vista protegida

urlpatterns = [
    # Registro de usuario
    path("register/", RegisterView.as_view(), name="auth_register"),

    # Login con JWT (obtención de access y refresh token)
    path("login/", TokenObtainPairView.as_view(), name="auth_login"),

    # Refresh del token
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Endpoint protegido de prueba
    path("protected/", ProtectedHelloView, name="auth_protected"),
]
