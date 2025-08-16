import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumen, mensual, categorias, recientes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/dashboard/resumen/"),
          axios.get("http://127.0.0.1:8000/api/dashboard/mensual/"),
          axios.get("http://127.0.0.1:8000/api/dashboard/categorias/"),
          axios.get("http://127.0.0.1:8000/api/dashboard/recientes/"),
        ]);

        setDashboardData(resumen.data);
        setMonthlyData(mensual.data);
        setCategoryData(categorias.data);
        setRecentOrders(recientes.data);
      } catch (err: any) {
        console.error("Error al cargar dashboard:", err);
        setError("No se pudieron cargar los datos del dashboard. Verifica que el backend permita acceso público o que envíes un token de autenticación.");
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string, urgent: boolean) => {
    const statusConfig = {
      pending: { label: "Pendiente", class: "bg-warning" },
      in_transit: { label: "En tránsito", class: "bg-info" },
      delivered: { label: "Entregado", class: "bg-success" },
    };

    return (
      <div className="d-flex align-items-center gap-1">
        {urgent && (
          <span className="badge bg-danger me-1">
            <i className="bi bi-exclamation-triangle me-1"></i>
            URGENTE
          </span>
        )}
        <span className={`badge ${statusConfig[status as keyof typeof statusConfig].class}`}>
          {statusConfig[status as keyof typeof statusConfig].label}
        </span>
      </div>
    );
  };

  if (error) {
    return <p className="m-4 text-danger">{error}</p>;
  }

  if (!dashboardData) {
    return <p className="m-4">Cargando dashboard...</p>;
  }

  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <h2>Dashboard</h2>
          <p className="text-muted">Resumen general del sistema de entregas</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Pedidos</h6>
              <h3>{dashboardData.totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Pendientes</h6>
              <h3 className="text-warning">{dashboardData.pendingOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Entregados</h6>
              <h3 className="text-success">{dashboardData.deliveredOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Urgentes</h6>
              <h3 className="text-danger">{dashboardData.urgentOrders}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila de estadísticas */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Clientes Activos</h6>
              <h4>{dashboardData.totalClients}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Choferes Activos</h6>
              <h4>{dashboardData.activeDrivers}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Ingresos</h6>
              <h4>${dashboardData.totalRevenue.toLocaleString()}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row mb-4">
        <div className="col-lg-8 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5>Pedidos por Mes</h5>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5>Pedidos por Categoría</h5>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || "#007bff"} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pedidos recientes */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5>Pedidos Recientes</h5>
              <ul className="list-group list-group-flush">
                {recentOrders.map((order) => (
                  <li key={order.id} className="list-group-item">
                    #{order.id} - Cliente {order.client} - Estado: {order.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
