import React, { createContext, useState } from 'react';
import usePartido from '../hooks/usePartido';
import useCandidatura from '../hooks/useCandidatura';
import useCandidato from '../hooks/useCandidato';
import useElecciones from '../hooks/useElecciones';
import useCargosElectorales from '../hooks/useCargosElectorales';
import useNivelElectoral from '../hooks/useNivelElectoral';
import useProvincia from '../hooks/useProvincia';
import useMunicipio from '../hooks/useMunicipio';
import useAuth from '../hooks/useAuth';
import useVoto from '../hooks/useVoto';

const DataContext = createContext();

function GlobalContext({ children }) {

  const [loading, setLoading] = useState(false);
  const { loginElector, loginAdmin } = useAuth(setLoading);
  const { enviarVoto } = useVoto(setLoading);

  const {
    partidos,
    cargarPartidos,
    agregarPartido,
    editarPartido,
    eliminarPartido,
  } = usePartido(setLoading);
  const {
    candidaturas,
    cargarCandidaturas,
    obtenerCandidaturaPorNivelElectoral,
    agregarCandidatura,
    editarCandidatura,
    eliminarCandidatura,
  } = useCandidatura(setLoading);
  const {
    candidatos,
    cargarCandidatos,
    agregarCandidato,
    editarCandidato,
    eliminarCandidato,
  } = useCandidato(setLoading);
  const {
    elecciones,
    cargarElecciones,
    agregarEleccion,
    asignarCandidatura,
    obtenerEleccionesPorFecha,
    obtenerEleccionPorId,
  } = useElecciones(setLoading);
  const {
    cargosElectorales,
    cargarCargosElectorales,
    obtenerCargosElectoralesPorId,
  } = useCargosElectorales(setLoading);
  const { nivelElectoral, cargarNivelElectoral, obtenerNivelElectoral } =
    useNivelElectoral(setLoading);
  const { provincias, cargarProvincias, obetenerProvincias } =
    useProvincia(setLoading);

  const { municipios, cargarMunicipios, obtenerMunicipio } =
    useMunicipio(setLoading);

  const data = {
    enviarVoto,
    loading,
    loginElector,
    loginAdmin,
    partidos,
    cargarPartidos,
    agregarPartido,
    editarPartido,
    eliminarPartido,
    candidaturas,
    cargarCandidaturas,
    obtenerCandidaturaPorNivelElectoral,
    agregarCandidatura,
    editarCandidatura,
    eliminarCandidatura,
    candidatos,
    cargarCandidatos,
    agregarCandidato,
    editarCandidato,
    eliminarCandidato,
    elecciones,
    cargarElecciones,
    agregarEleccion,
    obtenerEleccionesPorFecha,
    obtenerEleccionPorId,
    asignarCandidatura,
    cargosElectorales,
    cargarCargosElectorales,
    obtenerCargosElectoralesPorId,
    nivelElectoral,
    cargarNivelElectoral,
    obtenerNivelElectoral,
    provincias,
    cargarProvincias,
    obetenerProvincias,
    municipios,
    cargarMunicipios,
    obtenerMunicipio,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export { DataContext };
export default GlobalContext;
