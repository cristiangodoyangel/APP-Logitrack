// src/pages/Pedidos.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout"; // 👈 asegúrate que tu Layout esté en esta ruta

export function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/pedidos/")
      .then((res) => setPedidos(res.data))
      .catch(() => setError("No se pudieron cargar los pedidos."));
  }, []);

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#d8e7ed",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "#074260" }}>Pedidos</h2>
        <div
          className="card shadow-sm mt-3"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="card-body">
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.idoped}>
                      <td>{p.idoped}</td>
                      <td>{p.idclie}</td>
                      <td>{p.estped}</td>
                      <td>{p.fecped}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
