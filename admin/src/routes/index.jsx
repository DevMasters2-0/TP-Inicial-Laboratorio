import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IncidenciaDetalle, Incidencias } from '../components';
import IncidenciaModificar from "../components/IncidenciaModificar/IncidenciaModificar";
import Dashboard from '../components/Dashboard';
import MapaPage from '../components/MapaPage';
import { NotFound } from '../ui';
import Login from '../components/Login';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuthContext } from '../context/AuthProvider';

const Router = () => {
  const { isAuthenticated } = useAuthContext(); // Asegúrate de que el nombre sea consistente
  console.log("Esta autenticado: ", isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<MapaPage />} />
            <Route path="incidencias" element={<Incidencias />} />
            <Route path="incidencias/:id" element={<IncidenciaDetalle />} />
            <Route path="incidencias/:id/modificar" element={<IncidenciaModificar />} />
          </Route>
        </Route>
        
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/admin" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
