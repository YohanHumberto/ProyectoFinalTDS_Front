import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import LoginAdmin from "./views/Auth/LoginAdmin";
import Login from "./views/Auth/Login";
import GlobalContext from "./context/GlobalContext";
import AlertContext from "./context/AlertContext";
import Votacion from "./layouts/Votacion.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AlertContext>
    <GlobalContext>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/votacion/*" element={<Votacion />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  </AlertContext>
);
