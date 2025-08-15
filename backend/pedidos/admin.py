from django.contrib import admin
from .models import Cliente, Chofer, Pedido, Vehiculo


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "telefono", "ciudad", "created_at")
    search_fields = ("nombre", "telefono", "email", "ciudad")


@admin.register(Chofer)
class ChoferAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "telefono", "vehiculo", "activo")
    list_filter = ("activo",)
    search_fields = ("nombre", "telefono", "patente", "vehiculo")


@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ("id", "tipo", "marca", "modelo", "patente", "chofer_asignado", "activo")
    list_filter = ("activo", "tipo", "marca")
    search_fields = ("patente", "marca", "modelo")
    autocomplete_fields = ("chofer_asignado",)


@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ("idoped", "cliente", "chofer", "vehiculo", "fecped", "estped", "totped")
    list_filter = ("estped", "fecped")
    search_fields = ("idoped", "cliente__nombre", "chofer__nombre", "vehiculo__patente")
    autocomplete_fields = ("cliente", "chofer", "vehiculo")
