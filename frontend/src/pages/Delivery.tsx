// src/pages/Delivery.tsx
import { Layout } from "../components/Layout"; // ✅ usamos Layout

export function Delivery() {
  return (
    <Layout title="App Delivery">
      <div className="card shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="card-body">
          <p>
            Aquí podrás visualizar y simular el funcionamiento de la aplicación
            móvil de los repartidores. 🚚📱
          </p>
        </div>
      </div>
    </Layout>
  );
}
