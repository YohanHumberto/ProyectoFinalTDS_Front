import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import GlobalContext from "./context/GlobalContext";
import AlertContext from "./context/AlertContext";
import AuthContext from "./context/AuthContext.js";
import IndexRoutes from "./routes/Index.routes.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AlertContext>
    <GlobalContext>
      <AuthContext>
        <IndexRoutes />
      </AuthContext>
    </GlobalContext>
  </AlertContext>
);
