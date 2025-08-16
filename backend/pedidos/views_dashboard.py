# pedidos/views_dashboard.py
from django.db.models import Count, Sum, Value
from django.db.models.functions import ExtractMonth, ExtractYear, Coalesce
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Pedido, Cliente, Chofer


# pedidos/views_dashboard.py (solo función resumen corregida)
@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_resumen(request):
    try:
        total_orders = Pedido.objects.count()
        pending_orders = Pedido.objects.filter(estped="PEN").count()
        delivered_orders = Pedido.objects.filter(estped="ENT").count()
        urgent_orders = Pedido.objects.filter(notped__icontains="URGENTE").count()

        total_clients = Cliente.objects.count()

        # 🔹 validar si el modelo Chofer tiene el campo "activo"
        if hasattr(Chofer, "activo"):
            active_drivers = Chofer.objects.filter(activo=True).count()
        else:
            active_drivers = Chofer.objects.count()  # contar todos si no hay campo "activo"

        total_revenue = Pedido.objects.aggregate(
            total=Coalesce(Sum("totped"), Value(0))
        )["total"] or 0

        return Response({
            "totalOrders": total_orders,
            "pendingOrders": pending_orders,
            "deliveredOrders": delivered_orders,
            "urgentOrders": urgent_orders,
            "totalClients": total_clients,
            "activeDrivers": active_drivers,
            "totalRevenue": float(total_revenue),
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)



@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard_mensual(request):
    try:
        data = (
            Pedido.objects
            .filter(fecped__isnull=False)   # evitamos NULL
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
    try:
        data = (
            Pedido.objects
            .values("categoria")   # 👈 reemplazado idcon → categoria
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
    try:
        pedidos = Pedido.objects.order_by("-idoped")[:5]
        result = [
            {
                "id": p.idoped,
                "client": str(p.cliente_id or "Desconocido"),   # 👈 usa cliente_id del modelo
                "status": p.estped or "SIN ESTADO",
                "category": str(p.categoria or "Sin categoría"),  # 👈 usa categoria
                "urgent": "URGENTE" in (p.notped or "")
            }
            for p in pedidos
        ]
        return Response(result)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
