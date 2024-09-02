import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Heatmap, IncidenciaDetalle, Incidencias } from "../components";
import Dashboard from "../components/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Heatmap />} /> {/* Default route within /admin */}
          <Route path="incidencias" element={<Incidencias />} />
          <Route path="incidencias/:id" element={<IncidenciaDetalle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
