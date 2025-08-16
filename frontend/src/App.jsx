import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Vistas de ejemplo
function Home() {
  return <h2>🏠 Bienvenido a Logitrack</h2>;
}

function Pedidos() {
  return <h2>📦 Listado de Pedidos</h2>;
}

function Chofer() {
  return <h2>🚚 Panel del Chofer</h2>;
}

function Dashboard() {
  return <h2>📊 Dashboard con gráficos</h2>;
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Logitrack</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/pedidos">Pedidos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chofer">Chofer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/chofer" element={<Chofer />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';