import { useEffect, useState } from "react";
import axios from "axios";

export function Choferes() {
  const [choferes, setChoferes] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/chofer/")
      .then((res) => setChoferes(res.data))
      .catch(() => console.error("Error cargando choferes"));
  }, []);

  return (
    <div style={{ backgroundColor: "#d8e7ed", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: "#074260" }}>Choferes</h2>
      <div className="card shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="card-body">
          <table className="table">
            <thead>
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
        </div>
      </div>
    </div>
  );
}
