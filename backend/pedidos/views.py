from rest_framework import generics
from django.http import JsonResponse  # ← necesario para la función ping
from .models import Pedido
from .serializers import PedidoSerializer

class PedidoListCreateView(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

# Función ping para testear conectividad de la API
def ping(request):
    return JsonResponse({"message": "pong"})
