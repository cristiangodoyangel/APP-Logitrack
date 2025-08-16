import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// DataTables con Bootstrap 5
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

// Leaflet (mapas)
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

// Toastify (notificaciones)
import 'react-toastify/dist/ReactToastify.css'

// Opcional: tu propio CSS
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
