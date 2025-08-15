from rest_framework import generics
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from .models import Pedido
from .serializers import PedidoSerializer


class PedidoListCreateView(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['chofer', 'cliente', 'estped']  # filtros por ID o estado

# Función ping para testear conectividad de la API
def ping(request):
    return JsonResponse({"message": "pong"})
