// src/pages/Clientes.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout"; // ✅ usamos Layout

export function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clientes/")
      .then((res) => setClientes(res.data))
      .catch(() => setError("Error cargando clientes"));
  }, []);

  return (
    <Layout title="Clientes">
      <div className="card shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="card-body">
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.idclie}>
                    <td>{c.idclie}</td>
                    <td>{c.nomclie}</td>
                    <td>{c.email}</td>
                    <td>{c.telefono}</td>
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
