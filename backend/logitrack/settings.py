from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# Clave secreta y modo DEBUG desde variables de entorno
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-only-unsafe-key")
DEBUG = os.getenv("DJANGO_DEBUG", "1") == "1"
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",            # Permitir CORS
    "rest_framework",         # Django REST Framework
    "django_filters",         # Filtros para DRF
    "channels",               # WebSockets (Channels)
    "pedidos",                # Tu app de logística
    "rest_framework_simplejwt",  # Autenticación JWT
    "accounts",               # App de usuarios con roles personalizados
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "logitrack.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "logitrack.wsgi.application"
ASGI_APPLICATION = "logitrack.asgi.application"

import pymysql
pymysql.install_as_MySQLdb()

# se mirgra a MySQL
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("MYSQL_DATABASE", "misrutas"),
        "USER": os.getenv("MYSQL_USER", "root"),
        "PASSWORD": os.getenv("MYSQL_PASSWORD", "Calama1."),
        "HOST": os.getenv("MYSQL_HOST", "localhost"),
        "PORT": os.getenv("MYSQL_PORT", "3306"),
        "OPTIONS": {
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
            "charset": "utf8mb4",
        },
    }
}


# Modelo de usuario personalizado con roles
AUTH_USER_MODEL = "accounts.User"

# Validadores de contraseñas por defecto
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "es"
TIME_ZONE = "America/Santiago"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Configuración de CORS y CSRF
CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


# settings.py

from datetime import timedelta

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",   # JWT
        "rest_framework.authentication.SessionAuthentication",         # Sesiones (admin, login normal)
        "rest_framework.authentication.BasicAuthentication",           # Básica (útil para pruebas rápidas con curl/postman)
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",  # Requiere login por defecto
    ],
}



# Configuración de Simple JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),   # Token de acceso válido por 1 hora
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),      # Refresh token válido por 7 días
    "ROTATE_REFRESH_TOKENS": True,                    # Genera un nuevo refresh al renovar
    "BLACKLIST_AFTER_ROTATION": True,                 # Invalida el refresh anterior
    "AUTH_HEADER_TYPES": ("Bearer",),                 # Autenticación con "Authorization: Bearer <token>"
}
