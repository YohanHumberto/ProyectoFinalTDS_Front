import { useContext } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHandleStatusCode from '../helpers/HandleStatusCode';
import VotoService from '../services/VotoService';

function useVoto(setLoading) {

    const { Danger } = useContext(DataContextAlerts);
    const { OnHandleStatusCode } = useHandleStatusCode();

    let service = new VotoService();

    const enviarVoto = async (voto) => {
        try {
            var res = await service.voto(voto);
            OnHandleStatusCode(res);
            return res;
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        }
    }

    return ({ enviarVoto })
}

export default useVoto;