import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();

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
        setError("No se pudieron cargar los datos del dashboard.");
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
        <span
          className={`badge ${
            statusConfig[status as keyof typeof statusConfig].class
          }`}
        >
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
    <div style={{ backgroundColor: "#d8e7ed", minHeight: "100vh", padding: "20px" }}>
      {/* Menú de navegación con colores personalizados */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        {[
          { path: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
          { path: "/pedidos", icon: "bi-box", label: "Pedidos" },
          { path: "/clientes", icon: "bi-people", label: "Clientes" },
          { path: "/chofer", icon: "bi-truck", label: "Choferes" },
          { path: "/vehiculos", icon: "bi-car-front", label: "Vehículos" },
          { path: "/delivery", icon: "bi-phone", label: "App Delivery" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`btn ${
              location.pathname === item.path ? "active" : ""
            }`}
            style={{
              backgroundColor:
                location.pathname === item.path ? "#074260" : "#ffffff",
              color:
                location.pathname === item.path ? "#ffffff" : "#074260",
              border: "1px solid #074260",
              fontWeight: "500",
            }}
          >
            <i className={`bi ${item.icon} me-1`}></i>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Encabezado */}
      <div className="row mb-4">
        <div className="col">
          <h2 style={{ color: "#074260" }}>Dashboard</h2>
          <p style={{ color: "#052d48" }}>Resumen general del sistema de entregas</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="row mb-4">
        {[
          { title: "Total Pedidos", value: dashboardData.totalOrders },
          { title: "Pendientes", value: dashboardData.pendingOrders },
          { title: "Entregados", value: dashboardData.deliveredOrders },
          { title: "Urgentes", value: dashboardData.urgentOrders },
        ].map((card, idx) => (
          <div key={idx} className="col-md-3 mb-3">
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "none" }}
            >
              <div className="card-body">
                <h6 style={{ color: "#074260" }}>{card.title}</h6>
                <h3 style={{ color: "#074260" }}>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Segunda fila */}
      <div className="row mb-4">
        {[
          { title: "Clientes Activos", value: dashboardData.totalClients },
          { title: "Choferes Activos", value: dashboardData.activeDrivers },
          { title: "Ingresos", value: `$${dashboardData.totalRevenue.toLocaleString()}` },
        ].map((card, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "none" }}
            >
              <div className="card-body">
                <h6 style={{ color: "#074260" }}>{card.title}</h6>
                <h4 style={{ color: "#074260" }}>{card.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="row mb-4">
        <div className="col-lg-8 mb-3">
          <div className="card shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="card-body">
              <h5 style={{ color: "#074260" }}>Pedidos por Mes</h5>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d8e7ed" />
                    <XAxis dataKey="month" stroke="#074260" />
                    <YAxis stroke="#074260" />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#074260" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <div className="card shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="card-body">
              <h5 style={{ color: "#074260" }}>Pedidos por Categoría</h5>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color || "#074260"}
                        />
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
          <div className="card shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="card-body">
              <h5 style={{ color: "#074260" }}>Pedidos Recientes</h5>
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
