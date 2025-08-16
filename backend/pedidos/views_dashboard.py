# pedidos/views_dashboard.py
from django.db.models import Count, Sum, Value, DecimalField
from django.db.models.functions import ExtractMonth, ExtractYear, Coalesce
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Pedido, Cliente, Chofer


@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_resumen(request):
    """
    Devuelve un resumen general: totales de pedidos, pendientes, entregados, urgentes,
    total de clientes, choferes activos (si el modelo tiene el campo "activo")
    e ingresos (sumando totped).
    """
    try:
        total_orders = Pedido.objects.count()
        pending_orders = Pedido.objects.filter(estped="PEN").count()
        delivered_orders = Pedido.objects.filter(estped="ENT").count()
        urgent_orders = Pedido.objects.filter(notped__icontains="URGENTE").count()

        total_clients = Cliente.objects.count()

        # Si el modelo Chofer tiene un campo "activo", filtramos por él; de lo contrario contamos todos
        if hasattr(Chofer, "activo"):
            active_drivers = Chofer.objects.filter(activo=True).count()
        else:
            active_drivers = Chofer.objects.count()

        # Sumamos el campo totped y usamos DecimalField para evitar mezcla de tipos
        total_revenue = Pedido.objects.aggregate(
            total=Coalesce(Sum("totped"), Value(0), output_field=DecimalField())
        )["total"] or 0

        return Response({
            "totalOrders": total_orders or 0,
            "pendingOrders": pending_orders or 0,
            "deliveredOrders": delivered_orders or 0,
            "urgentOrders": urgent_orders or 0,
            "totalClients": total_clients or 0,
            "activeDrivers": active_drivers or 0,
            "totalRevenue": float(total_revenue or 0),
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_mensual(request):
    """
    Devuelve el número de pedidos por mes y año.
    Agrupa por año y mes para evitar mezclar datos de distintos años.
    """
    try:
        data = (
            Pedido.objects
            .filter(fecped__isnull=False)  # Evitamos fechas nulas
            .annotate(year=ExtractYear("fecped"), month=ExtractMonth("fecped"))
            .values("year", "month")
            .annotate(orders=Count("idoped"))
            .order_by("year", "month")
        )

        meses = {
            1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr",
            5: "May", 6: "Jun", 7: "Jul", 8: "Ago",
            9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"
        }

        result = [
            {
                "month": f"{meses.get(x['month'], x['month'])} {x['year']}",
                "orders": x["orders"] or 0
            }
            for x in data
        ]
        return Response(result)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_categorias(request):
    """
    Devuelve la cantidad de pedidos agrupados por categoría.
    Usa el campo 'categoria' definido en el modelo Pedido.
    """
    try:
        data = (
            Pedido.objects
            .values("categoria")
            .annotate(value=Count("idoped"))
        )
        result = [
            {"name": str(x["categoria"] or "Sin categoría"), "value": x["value"] or 0}
            for x in data
        ]
        return Response(result)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_recientes(request):
    """
    Devuelve los 5 pedidos más recientes.
    Incluye id, cliente, estado, categoría y si es urgente.
    """
    try:
        pedidos = Pedido.objects.order_by("-idoped")[:5]
        result = []
        for p in pedidos:
            # Si el modelo Pedido tiene relación con Cliente, usamos la representación de la instancia;
            # en caso contrario, usamos cliente_id.
            if hasattr(p, "cliente") and p.cliente:
                client = str(p.cliente)
            else:
                client = str(p.cliente_id or "Desconocido")

            category = str(p.categoria or "Sin categoría")
            status = p.estped or "SIN ESTADO"
            urgent_flag = "URGENTE" in (p.notped or "")

            result.append({
                "id": p.idoped,
                "client": client,
                "status": status,
                "category": category,
                "urgent": urgent_flag,
            })
        return Response(result)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
