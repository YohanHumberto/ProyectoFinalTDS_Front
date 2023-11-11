import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';
import MunicipiosService from '../services/MunicipiosService';

function useMunicipio(setLoading) {
  const dataContextAlerts = useContext(DataContextAlerts);

  let service = new MunicipiosService();
  const [municipios, setMunicipio] = useState([]);

  const { cargarDatos, obtenerPorId } = useHookBase(
    dataContextAlerts,
    service,
    setMunicipio,
    setLoading
  );

  return {
    municipios,
    cargarMunicipios: cargarDatos,
    obtenerMunicipio: obtenerPorId,
  };
}

export default useMunicipio;
