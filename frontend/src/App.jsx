// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importar las páginas reales
import { Dashboard } from "./pages/Dashboard";
import { Pedidos } from "./pages/Pedidos";
import { Clientes } from "./pages/Clientes";
import { Choferes } from "./pages/Choferes";
import { Vehiculos } from "./pages/Vehiculos";
import { Delivery } from "./pages/Delivery";

function Home() {
  return <h2>Bienvenido a Logitrack</h2>;
}

function App() {
  return (
    <Router>
      {/* Navbar personalizada con logo */}
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#074260" }}
      >
        <div className="container d-flex align-items-center">
          <Link
            className="navbar-brand d-flex align-items-center text-white fw-bold"
            to="/"
          >
            <img
              src="/img/logo.png"
              alt="Logitrack"
              style={{ height: "40px", marginRight: "10px" }}
            />
            LOGITRACK
          </Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/choferes" element={<Choferes />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
