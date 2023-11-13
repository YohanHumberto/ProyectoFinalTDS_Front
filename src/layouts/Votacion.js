import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import IndexVotacion from "../views/Votacion/IndexVotacion.jsx";
import VotacionNavbar from "../components/Navbars/VotacionNavbar.js";
import NivelesElectorales from "../views/Votacion/NivelesElectorales.jsx";

const Votacion = (props) => {
  return (
    <>
      <div className="main-content">
        <Routes>
          <Route path="/votaciones" element={<IndexVotacion />} exact />
          <Route path="/NivelPresidencial" element={<NivelesElectorales nivel="Presidencial" />} exact />
          <Route path="/NivelSenatorial" element={<NivelesElectorales nivel="Senatorial" />} exact />
          <Route path="/NivelDiputacion" element={<NivelesElectorales nivel="Diputación" />} exact />
          <Route path="/NivelMunicipal" element={<NivelesElectorales nivel="Municipal" />} exact />
        </Routes>
        <Container fluid>
        </Container>
      </div>
    </>
  );
};

export default Votacion;
