import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IncidenciaDetalle, Incidencias } from "../components";
import Dashboard from "../components/Dashboard";
import MapaPage from "../components/MapaPage";
import { NotFound } from "../ui";
import Login from "../components/Login";
import { useState } from "react";

const Router = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />


        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route path="/admin" element={
          isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />
        }>
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
