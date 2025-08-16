# pedidos/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count
from .models import Cliente, Chofer, Vehiculo, Pedido
from .serializers import ClienteSerializer, ChoferSerializer, VehiculoSerializer, PedidoSerializer

# -------------------------------
# CRUD GENERALES
# -------------------------------

# Clientes
class ClienteListCreateView(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    filterset_fields = ['ciudad', 'nombre']

class ClienteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

# Choferes
class ChoferListCreateView(generics.ListCreateAPIView):
    queryset = Chofer.objects.all()
    serializer_class = ChoferSerializer
    filterset_fields = ['activo', 'nombre']

class ChoferRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chofer.objects.all()
    serializer_class = ChoferSerializer

# Vehículos
class VehiculoListCreateView(generics.ListCreateAPIView):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    filterset_fields = ['activo', 'patente']

class VehiculoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

# -------------------------------
# PEDIDOS
# -------------------------------

# 1. PedidoListCreateView (ya la tienes, con ordering)
class PedidoListCreateView(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    filterset_fields = ['chofer', 'cliente', 'estped']
    ordering_fields = ['fecped', 'estped']

# 2. Actualizar estado de pedido (solo PATCH y solo estped)
class PedidoEstadoUpdateView(generics.UpdateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    http_method_names = ['patch']

    def partial_update(self, request, *args, **kwargs):
        pedido = self.get_object()
        nuevo_estado = request.data.get('estped')
        if not nuevo_estado:
            return Response(
                {"error": "Debes enviar el campo 'estped'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        pedido.estped = nuevo_estado
        pedido.save(update_fields=['estped'])

        return Response(
            {
                "mensaje": "Estado actualizado",
                "pedido": PedidoSerializer(pedido).data
            },
            status=status.HTTP_200_OK
        )

# 2B. Actualizar estado y ubicación de pedido
class PedidoEstadoUbicacionUpdateView(generics.UpdateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    http_method_names = ['patch']

    def partial_update(self, request, *args, **kwargs):
        pedido = self.get_object()
        nuevo_estado = request.data.get('estped')
        latitud = request.data.get('latitud')
        longitud = request.data.get('longitud')

        if not nuevo_estado:
            return Response(
                {"error": "Debes enviar al menos el campo 'estped'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        pedido.estped = nuevo_estado
        if latitud and longitud:
            pedido.latitud = latitud
            pedido.longitud = longitud

        pedido.save(update_fields=['estped', 'latitud', 'longitud'])

        return Response(
            {
                "mensaje": "Estado y ubicación actualizados",
                "pedido": PedidoSerializer(pedido).data
            },
            status=status.HTTP_200_OK
        )


# 3. Vista para chofer (pedidos activos)
class PedidosChoferActivosView(generics.ListAPIView):
    serializer_class = PedidoSerializer

    def get_queryset(self):
        chofer_id = self.kwargs['chofer_id']
        # Filtrar por los códigos de estado
        estados_activos = ['PEN', 'ENV']  
        return Pedido.objects.filter(chofer=chofer_id, estped__in=estados_activos)



# 4. Ping de conexión
@api_view(['GET'])
def ping(request):
    return Response({'status': 'ok', 'message': 'API funcionando'})

# 5. Resumen/estadísticas
@api_view(['GET'])
def resumen_pedidos(request):
    resumen = Pedido.objects.values('estped').annotate(total=Count('idoped'))
    return Response({'resumen': list(resumen)})
