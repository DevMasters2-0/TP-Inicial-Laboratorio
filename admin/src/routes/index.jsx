import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IncidenciaDetalle, Incidencias } from "../components";
import Dashboard from "../components/Dashboard";
import MapaPage from "../components/MapaPage";
import { NotFound } from "../ui";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<MapaPage />} /> {/* Default route within /admin */}
          <Route path="incidencias" element={<Incidencias />} />
          <Route path="incidencias/:id" element={<IncidenciaDetalle />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
