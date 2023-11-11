import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';
import NivelElectoralServices from '../services/NivelElectoralService';

function useNivelElectoral(setLoading) {
  const dataContextAlerts = useContext(DataContextAlerts);

  let service = new NivelElectoralServices();
  const [nivelElectoral, setNivelElectoral] = useState([]);

  const { cargarDatos, obtenerPorId } = useHookBase(
    dataContextAlerts,
    service,
    setNivelElectoral,
    setLoading
  );

  return {
    nivelElectoral,
    cargarNivelElectoral: cargarDatos,
    obtenerNivelElectoral: obtenerPorId,
  };
}

export default useNivelElectoral;
