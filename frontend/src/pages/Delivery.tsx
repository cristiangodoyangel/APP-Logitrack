// src/pages/Delivery.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { Link, useLocation } from "react-router-dom"; // <-- añadir estas importaciones

// Estructura de un pedido según tu serializer
interface Pedido {
  id?: number;        // si viene con 'id'
  idoped?: number;    // si viene con 'idoped'
  cliente_nombre: string;
  chofer_nombre: string;
  categoria: string;
  urgente: boolean;
  notped: string | null;
}

export function Delivery() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation(); // <-- para saber la ruta activa

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Endpoint público de pedidos
        const res = await axios.get("http://127.0.0.1:8000/api/pedidos/public/");
        setPedidos(res.data);
      } catch (err) {
        console.error("Error cargando pedidos:", err);
        setError("No se pudieron cargar los pedidos.");
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  if (loading) return <p className="m-4">Cargando pedidos...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;

  return (
    <Layout title="App Delivery">
      {/* Estilos para botones como en Dashboard */}
      <style>{`
        .nav-btn {
          background-color: #ffffff;
          color: #074260;
          border: 1px solid #074260;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
        }
        .nav-btn:hover {
          background-color: #074260;
          color: #ffffff;
          box-shadow: 0 0 10px rgba(7, 66, 96, 0.6);
        }
        .nav-btn.active {
          background-color: #074260 !important;
          color: #ffffff !important;
        }
      `}</style>

   {/* Menú de navegación */}
<div className="mb-4 d-flex flex-wrap justify-content-center gap-2">
  {[
    { path: "/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { path: "/pedidos",   icon: "bi-box",         label: "Pedidos"   },
    { path: "/clientes",  icon: "bi-people",      label: "Clientes"  },
    { path: "/choferes",  icon: "bi-truck",       label: "Choferes"  },
    { path: "/vehiculos", icon: "bi-car-front",   label: "Vehículos" },
    { path: "/delivery",  icon: "bi-phone",       label: "App Delivery" },
  ].map(item => (
    <Link
      key={item.path}
      to={item.path}
      className={`btn nav-btn ${location.pathname === item.path ? "active" : ""}`}
    >
      <i className={`bi ${item.icon} me-1`}></i>
      {item.label}
    </Link>
  ))}
</div>


      <div className="container-fluid" style={{ maxWidth: "480px", margin: "0 auto" }}>
        {/* Encabezado */}
        <div className="card border-0 shadow-sm mb-3">
          <div className="card-body text-center">
            <h4 className="mb-1">App de Delivery</h4>
            <p className="text-muted mb-0">Panel de control para choferes</p>
          </div>
        </div>

        <h5 className="mb-3">Pedidos Asignados</h5>

        {/* Listado de pedidos */}
        {pedidos.map(order => (
          <div key={order.id ?? order.idoped} className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              {order.urgente && (
                <span className="badge bg-danger mb-2">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  URGENTE
                </span>
              )}

              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="mb-1">{order.cliente_nombre}</h6>
                  <small className="text-muted">
                    Pedido #{order.id ?? order.idoped}
                  </small>
                </div>
                <span className="badge bg-secondary">{order.categoria}</span>
              </div>

              {order.notped && (
                <div className="alert alert-light py-2 mb-3">
                  <i className="bi bi-chat-square-text me-2 text-muted"></i>
                  <small>{order.notped}</small>
                </div>
              )}

              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-navigation me-2"></i>
                  Iniciar
                </button>
                <button className="btn btn-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Entregar
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Mensaje si no hay pedidos */}
        {pedidos.length === 0 && (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-4">
              <i className="bi bi-inbox text-muted mb-3" style={{ fontSize: "3rem" }}></i>
              <p className="text-muted mb-2">No hay pedidos asignados</p>
              <small className="text-muted">
                Mantente disponible para recibir nuevos pedidos
              </small>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
