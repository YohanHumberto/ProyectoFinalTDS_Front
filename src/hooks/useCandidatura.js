import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import CandidaturaService from '../services/CandidaturaService';
import useHookBase from './useHookBase';
import useHandleStatusCode from '../helpers/HandleStatusCode';

function useCandidatura(setLoading) {

    const dataContextAlerts = useContext(DataContextAlerts);

    let service = new CandidaturaService();
    const [candidaturas, setcandidaturas] = useState([]);
    const { OnHandleStatusCode } = useHandleStatusCode();


    const { cargarDatos, agregar, editar, eliminar } = useHookBase(dataContextAlerts, service, setcandidaturas, setLoading);

    const obtenerPorNivelElectoral = async (nivelElectoral = '') => {
        try {
            setLoading(true);
            var res = await service.obtenerPorNivelElectoral(nivelElectoral);
            OnHandleStatusCode(res);
            return res.data;
        } catch (error) {
            console.log(error);
            dataContextAlerts.Danger("Se ha presentado un error inesperado al cargar los datos, intentelo mas tarde.");
        }
    }

    return (
        {
            candidaturas,
            cargarCandidaturas: cargarDatos,
            agregarCandidatura: agregar,
            editarCandidatura: editar,
            eliminarCandidatura: eliminar,
            obtenerCandidaturaPorNivelElectoral: obtenerPorNivelElectoral
        }
    )
}

export default useCandidatura;