import { useContext, useState } from 'react';
import PartidoService from '../services/PartidoService';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';

function usePartido() {

    const dataContextAlerts = useContext(DataContextAlerts);

    let service = new PartidoService();
    const [partidos, setPartidos] = useState([]);

    const { cargarDatos, agregar, editar, eliminar } = useHookBase(dataContextAlerts, service, setPartidos);

    return (
        {
            partidos,
            cargarPartidos: cargarDatos,
            agregarPartido: agregar,
            editarPartido: editar,
            eliminarPartido: eliminar
        }
    )
}

export default usePartido;