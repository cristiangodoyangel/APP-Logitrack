from django.contrib import admin
from .models import Cliente, Chofer, Pedido

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "telefono", "ciudad", "created_at")
    search_fields = ("nombre", "telefono", "email", "ciudad")

@admin.register(Chofer)
class ChoferAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "telefono", "vehiculo", "activo")
    list_filter = ("activo",)
    search_fields = ("nombre", "telefono", "patente", "vehiculo")

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ("idoped", "cliente", "chofer", "fecped", "estped", "totped")
    list_filter = ("estped", "fecped")
    search_fields = ("idoped", "cliente__nombre", "chofer__nombre")
    autocomplete_fields = ("cliente", "chofer")
