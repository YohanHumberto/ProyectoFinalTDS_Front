import React, { createContext, useState } from 'react';
import usePartido from '../hooks/usePartido';
import useCandidatura from '../hooks/useCandidatura';
import useCandidato from '../hooks/useCandidato';
import useElecciones from '../hooks/useElecciones';
import useCargosElectorales from '../hooks/useCargosElectorales';
import useNivelElectoral from '../hooks/useNivelElectoral';
import useProvincia from '../hooks/useProvincia';
import useMunicipio from '../hooks/useMunicipio';
// import useAlert from '../hooks/useAlert';

const DataContext = createContext();

function GlobalContext({ children }) {
  const [loading, setLoading] = useState(false);

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
  const { elecciones, cargarElecciones, agregarEleccion, asignarCandidatura, obtenerEleccionesPorFecha } =
    useElecciones(setLoading);
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
    loading,
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
