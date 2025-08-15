# pedidos/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count
from .models import Pedido
from .serializers import PedidoSerializer

# 1. PedidoListCreateView (ya la tienes, solo agregamos ordering)
class PedidoListCreateView(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    filterset_fields = ['chofer', 'cliente', 'estped']
    ordering_fields = ['fecped', 'estped']  # Nuevo

# 2. Actualizar estado de pedido
class PedidoEstadoUpdateView(generics.UpdateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    def partial_update(self, request, *args, **kwargs):
        pedido = self.get_object()
        nuevo_estado = request.data.get('estped', None)
        if nuevo_estado:
            pedido.estped = nuevo_estado
            pedido.save()
            return Response({'mensaje': 'Estado actualizado', 'pedido': PedidoSerializer(pedido).data})
        return Response({'error': 'No se envió el estado'}, status=status.HTTP_400_BAD_REQUEST)

# 3. Vista para chofer (solo pedidos activos asignados a él)
class PedidosChoferActivosView(generics.ListAPIView):
    serializer_class = PedidoSerializer

    def get_queryset(self):
        chofer_id = self.kwargs['chofer_id']
        return Pedido.objects.filter(chofer=chofer_id, estped='ENV')

# 4. Ping de conexión
@api_view(['GET'])
def ping(request):
    return Response({'status': 'ok', 'message': 'API funcionando'})

# 5. Resumen/estadísticas
@api_view(['GET'])
def resumen_pedidos(request):
    resumen = Pedido.objects.values('estped').annotate(total=Count('idoped'))
    return Response({'resumen': list(resumen)})
