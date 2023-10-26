import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';
import CargosElectoralesService from '../services/CargosElectoralesService';

function useCargosElectorales(setLoading) {

    const dataContextAlerts = useContext(DataContextAlerts);

    let service = new CargosElectoralesService();
    const [cargosElectorales, setCargosElectorales] = useState([]);

    const { cargarDatos, obtenerPorId } = useHookBase(dataContextAlerts, service, setCargosElectorales,setLoading);

    return (
        {
            cargosElectorales,
            cargarCargosElectorales: cargarDatos,
            obtenerCargosElectoralesPorId: obtenerPorId
        }
    )
}

export default useCargosElectorales;