import Index from "../views/Index.js";
import IndexPartido from "../views/Partidos/IndexPartido.jsx";
import IndexCandidatura from "../views/Candidaturas/IndexCandidatura.jsx";
import IndexCandidatos from "../views/Candidatos/IndexCandidatos.jsx";
import IndexElecciones from "../views/Elecciones/IndexElecciones.jsx";
import IndexVotacion from "../views/Votacion/IndexVotacion.jsx";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  {
    path: "/partidos",
    name: "Partidos",
    icon: "ni ni-archive-2 text-info",
    component: <IndexPartido />,
    layout: "/admin",
  },
  {
    path: "/candidatos",
    name: "Candidatos",
    icon: "ni ni-archive-2 text-info",
    component: <IndexCandidatos />,
    layout: "/admin",
  },
  {
    path: "/candidaturas",
    name: "Candidaturas",
    icon: "ni ni-archive-2 text-info",
    component: <IndexCandidatura />,
    layout: "/admin",
  },
  {
    path: "/elecciones",
    name: "Elecciones",
    icon: "ni ni-archive-2 text-info",
    component: <IndexElecciones />,
    layout: "/admin",
  },
];
export default routes;
