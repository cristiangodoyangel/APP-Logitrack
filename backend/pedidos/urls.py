# pedidos/urls.py
from django.urls import path
from .views import (
    PedidoListCreateView,
    PedidoEstadoUpdateView,
    PedidosChoferActivosView,
    ping,
    resumen_pedidos
)

urlpatterns = [
    # Ping de prueba
    path("ping/", ping, name="ping"),

    # Listar y crear pedidos (con filtros y ordering)
    path("pedidos/", PedidoListCreateView.as_view(), name="pedido-list-create"),

    # Actualizar solo el estado de un pedido
    path("pedidos/<int:pk>/estado/", PedidoEstadoUpdateView.as_view(), name="pedido-estado-update"),

    # Pedidos activos para un chofer específico
    path("pedidos/chofer/<int:chofer_id>/activos/", PedidosChoferActivosView.as_view(), name="pedidos-chofer-activos"),

    # Resumen/estadísticas de pedidos por estado
    path("pedidos/resumen/", resumen_pedidos, name="resumen-pedidos"),
]
