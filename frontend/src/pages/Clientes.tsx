import { useEffect, useState } from "react";
import axios from "axios";

export function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/clientes/")
      .then((res) => setClientes(res.data))
      .catch(() => console.error("Error cargando clientes"));
  }, []);

  return (
    <div style={{ backgroundColor: "#d8e7ed", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: "#074260" }}>Clientes</h2>
      <div className="card shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="card-body">
          <table className="table">
            <thead>
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
        </div>
      </div>
    </div>
  );
}
