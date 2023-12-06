import React from "react";
import { Navigate, Route } from "react-router-dom";
import Index from "../views/Index.js";
import IndexPartido from "../views/Partidos/IndexPartido.jsx";
import IndexCandidatura from "../views/Candidaturas/IndexCandidatura.jsx";
import IndexCandidatos from "../views/Candidatos/IndexCandidatos.jsx";
import IndexElecciones from "../views/Elecciones/IndexElecciones.jsx";
import Admin from "../layouts/Admin.js";
import { AuthGuardAdmin } from "./AuthGuard.routes.js";

const AdminRoutes = () => {
    return (
        <Route path="/admin" element={<Admin />}>
            <Route path="index" element={<AuthGuardAdmin element={<Index />} />} />
            <Route path="partidos" element={<AuthGuardAdmin element={<IndexPartido />} />} />
            <Route path="candidatos" element={<AuthGuardAdmin element={<IndexCandidatos />} />} />
            <Route path="candidaturas" element={<AuthGuardAdmin element={<IndexCandidatura />} />} />
            <Route path="elecciones" element={<AuthGuardAdmin element={<IndexElecciones />} />} />
            <Route path="*" element={<AuthGuardAdmin element={<Navigate to="/admin/index" replace />} />} />
        </Route>
    );
};

export default AdminRoutes;