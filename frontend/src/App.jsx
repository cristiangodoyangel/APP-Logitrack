import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importar el Dashboard real
import { Dashboard } from "./pages/Dashboard";

function Home() {
  return <h2> Bienvenido a Logitrack</h2>;
}

function Pedidos() {
  return <h2> Listado de Pedidos</h2>;
}

function Chofer() {
  return <h2> Panel del Chofer</h2>;
}

function App() {
  return (
    <Router>
      {/* Navbar personalizada con logo */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#074260" }}>
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand d-flex align-items-center text-white fw-bold" to="/">
            <img
              src="/img/logo.png"
              alt="Logitrack"
              style={{ height: "40px", marginRight: "10px" }}
            />
            Logitrack
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/pedidos">
                  Pedidos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/chofer">
                  Chofer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">
                  Dashboard
                </Link>
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
