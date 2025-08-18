// src/pages/Vehiculos.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../components/Layout"; // ✅ usamos Layout

export function Vehiculos() {
  const [vehiculos, setVehiculos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/vehiculos/")
      .then((res) => setVehiculos(res.data))
      .catch(() => setError("Error cargando vehículos"));
  }, []);

  return (
    <Layout title="Vehículos">
      <div className="card shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="card-body">
          {error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Patente</th>
                  <th>Modelo</th>
                  <th>Año</th>
                  <th>Chofer Asignado</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((v) => (
                  <tr key={v.idvehiculo}>
                    <td>{v.idvehiculo}</td>
                    <td>{v.patente}</td>
                    <td>{v.modelo}</td>
                    <td>{v.anio}</td>
                    <td>{v.chofer_asignado}</td>
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
