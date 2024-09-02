import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Heatmap, Incidencias } from "../components";
import Dashboard from "../components/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Heatmap />} /> {/* Ruta predeterminada dentro de /admin */}
          <Route path="incidencias" element={<Incidencias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
