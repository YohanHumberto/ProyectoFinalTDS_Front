import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import CandidaturaService from '../services/CandidaturaService';
import useHookBase from './useHookBase';

function useCandidatura() {

    const dataContextAlerts = useContext(DataContextAlerts);

    let service = new CandidaturaService();
    const [candidaturas, setcandidaturas] = useState([]);

    const { cargarDatos, agregar, editar, eliminar } = useHookBase(dataContextAlerts, service, setcandidaturas);

    return (
        {
            candidaturas,
            cargarCandidaturas: cargarDatos,
            agregarCandidatura: agregar,
            editarCandidatura: editar,
            eliminarCandidatura: eliminar   
        }
    )
}

export default useCandidatura;