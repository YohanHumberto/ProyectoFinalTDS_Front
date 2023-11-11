import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';
import ProvinciasService from '../services/ProvinciasService';

function useProvincia(setLoading) {
  const dataContextAlerts = useContext(DataContextAlerts);

  let service = new ProvinciasService();
  const [provincias, setProvincia] = useState([]);

  const { cargarDatos, obtenerPorId } = useHookBase(
    dataContextAlerts,
    service,
    setProvincia,
    setLoading
  );

  return {
    provincias,
    cargarProvincias: cargarDatos,
    obetenerProvincias: obtenerPorId,
  };
}

export default useProvincia;
