// src/pages/Pedidos.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout"; // ✅ corregida la ruta real (components)

export function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/pedidos/")
      .then((res) => setPedidos(res.data))
      .catch(() => setError("No se pudieron cargar los pedidos."));
  }, []);

  return (
    <Layout title="Pedidos">
      <div className="card shadow-sm" style={{ backgroundColor: "#ffffff" }}>
        <div className="card-body">
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <table className="table table-striped">
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
    </Layout>
  );
}
