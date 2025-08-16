# pedidos/urls.py
from django.urls import path
from .views import (
    # CRUD Pedidos
    PedidoListCreateView,
    PedidoEstadoUpdateView,
    PedidoEstadoUbicacionUpdateView,
    PedidosChoferActivosView,
    # CRUD Clientes
    ClienteListCreateView,
    ClienteRetrieveUpdateDestroyView,
    # CRUD Choferes
    ChoferListCreateView,
    ChoferRetrieveUpdateDestroyView,
    # CRUD Vehiculos
    VehiculoListCreateView,
    VehiculoRetrieveUpdateDestroyView,
    # Utilidades
    ping,
    resumen_pedidos
)

urlpatterns = [
    # Ping de prueba
    path("ping/", ping, name="ping"),

    # --------------------------
    # CRUD Pedidos
    # --------------------------
    path("pedidos/", PedidoListCreateView.as_view(), name="pedido-list-create"),
    path("pedidos/<int:pk>/estado/", PedidoEstadoUpdateView.as_view(), name="pedido-estado-update"),
    path("pedidos/<int:pk>/estado-ubicacion/", PedidoEstadoUbicacionUpdateView.as_view(), name="pedido-estado-ubicacion-update"),
    path("pedidos/chofer/<int:chofer_id>/activos/", PedidosChoferActivosView.as_view(), name="pedidos-chofer-activos"),
    path("pedidos/resumen/", resumen_pedidos, name="resumen-pedidos"),

    # --------------------------
    # CRUD Clientes
    # --------------------------
    path("clientes/", ClienteListCreateView.as_view(), name="cliente-list-create"),
    path("clientes/<int:pk>/", ClienteRetrieveUpdateDestroyView.as_view(), name="cliente-detail"),

    # --------------------------
    # CRUD Choferes
    # --------------------------
    path("choferes/", ChoferListCreateView.as_view(), name="chofer-list-create"),
    path("choferes/<int:pk>/", ChoferRetrieveUpdateDestroyView.as_view(), name="chofer-detail"),

    # --------------------------
    # CRUD Vehiculos
    # --------------------------
    path("vehiculos/", VehiculoListCreateView.as_view(), name="vehiculo-list-create"),
    path("vehiculos/<int:pk>/", VehiculoRetrieveUpdateDestroyView.as_view(), name="vehiculo-detail"),
]
