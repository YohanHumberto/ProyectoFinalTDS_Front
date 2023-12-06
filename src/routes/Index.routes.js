import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import AuthRoutes from "./Auth.routes";
import AdminRoutes from "./Admin.routes";
import ElectorRoutes from "./Elector.routes";

const IndexRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {AuthRoutes()}
                {AdminRoutes()}
                {ElectorRoutes()}
            </Routes>
        </BrowserRouter>
    );
};

export default IndexRoutes;
