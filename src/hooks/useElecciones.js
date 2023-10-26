import { useContext, useState } from 'react';
import EleccionesService from '../services/EleccionesService';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';
import useHandleStatusCode from '../helpers/HandleStatusCode';

function useElecciones(setLoading) {

    const dataContextAlerts = useContext(DataContextAlerts);
    const { Danger } = dataContextAlerts;
    const { OnHandleStatusCode } = useHandleStatusCode();

    let service = new EleccionesService();
    const [elecciones, setElecciones] = useState([]);

    const asignarCandidatura = async (entity) => {
        try {
            var res = await service.asignarCandidatura(entity);
            OnHandleStatusCode(res);
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        } finally {
            cargarDatos();
        }
    }

    const { cargarDatos, agregar } = useHookBase(dataContextAlerts, service, setElecciones,setLoading);

    return (
        {
            elecciones,
            cargarElecciones: cargarDatos,
            agregarEleccion: agregar,
            asignarCandidatura
        }
    )
}

export default useElecciones;