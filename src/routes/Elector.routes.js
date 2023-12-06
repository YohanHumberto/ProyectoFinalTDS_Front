import React from "react";
import { Navigate, Route } from "react-router-dom";
import IndexVotacion from "../views/Votacion/IndexVotacion.jsx";
import NivelesElectorales from "../views/Votacion/NivelesElectorales.jsx";
import Votacion from "../layouts/Votacion.js";
import { AuthGuardElector } from "./AuthGuard.routes.js";

const ElectorRoutes = () => {
    return (
        <Route path="/votacion" element={<Votacion />}>
            <Route path="votaciones" element={<AuthGuardElector element={<IndexVotacion />} />} exact />
            <Route path="NivelPresidencial" element={<AuthGuardElector element={<NivelesElectorales nivel="Presidencial" />} />} exact />
            <Route path="NivelSenatorial" element={<AuthGuardElector element={<NivelesElectorales nivel="Senatorial" />} />} exact />
            <Route path="NivelDiputacion" element={<AuthGuardElector element={<NivelesElectorales nivel="Diputación" />} />} exact />
            <Route path="NivelMunicipal" element={<AuthGuardElector element={<NivelesElectorales nivel="Municipal" />} />} exact />
            <Route path="*" element={<AuthGuardElector element={<Navigate to="/votacion/votaciones" replace />} />} />
        </Route>
    );
};

export default ElectorRoutes;
