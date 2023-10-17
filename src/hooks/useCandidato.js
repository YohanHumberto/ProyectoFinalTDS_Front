import { useContext, useState } from 'react';
import CandidatoService from '../services/CandidatoService';
import { DataContextAlerts } from '../context/AlertContext';
import useHookBase from './useHookBase';

function useCandidato() {

    const dataContextAlerts = useContext(DataContextAlerts);

    let service = new CandidatoService();
    const [candidatos, setCandidatos] = useState([]);

    const { cargarDatos, agregar, editar, eliminar } = useHookBase(dataContextAlerts, service, setCandidatos);

    return (
        {
            candidatos,
            cargarCandidatos: cargarDatos,
            agregarCandidato: agregar,
            editarCandidato: editar,
            eliminarCandidato: eliminar
        }
    )
}

export default useCandidato;