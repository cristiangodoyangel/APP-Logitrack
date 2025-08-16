from rest_framework.permissions import BasePermission
from .models import User

class IsAdmin(BasePermission):
    """
    Permite el acceso solo a administradores (rol ADMIN).
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == User.Role.ADMIN)

class IsChofer(BasePermission):
    """
    Permite el acceso solo a choferes (rol CHOFER).
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == User.Role.CHOFER)

class IsCliente(BasePermission):
    """
    Permite el acceso solo a clientes (rol CLIENTE).
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == User.Role.CLIENTE)
