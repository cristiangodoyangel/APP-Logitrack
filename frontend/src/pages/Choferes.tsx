// src/pages/Choferes.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout"; // ✅ usamos Layout

export function Choferes() {
  const [choferes, setChoferes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/chofer/")
      .then((res) => setChoferes(res.data))
      .catch(() => setError("Error cargando choferes"));
  }, []);

  return (
    <Layout title="Choferes">
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
                  <th>Licencia</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {choferes.map((c) => (
                  <tr key={c.idchofer}>
                    <td>{c.idchofer}</td>
                    <td>{c.nombre}</td>
                    <td>{c.licencia}</td>
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
