from django.urls import path
from .views import PedidoListCreateView, ping

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("pedidos/", PedidoListCreateView.as_view(), name="pedido-list-create"),
]
