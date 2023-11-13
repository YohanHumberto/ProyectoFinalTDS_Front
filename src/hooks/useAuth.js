import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHandleStatusCode from '../helpers/HandleStatusCode';
import AuthService from '../services/AuthService';


function useAuth(setLoading) {

    const { Warning, Danger, Info, Success } = useContext(DataContextAlerts);
    const { OnHandleStatusCode } = useHandleStatusCode();

    let service = new AuthService();
    // const [candidatos, setCandidatos] = useState([]);

    const loginElector = async (credentencials) => {
        try {
            var res = await service.loginElector(credentencials);
            OnHandleStatusCode(res);
            return res;
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        }
    }

    const loginAdmin = async (user) => {
        try {
            var res = await service.login(user);
            OnHandleStatusCode(res);
            return res;
        } catch (error) {
            console.log(error);
            Danger("Se ha presentado un error inesperado al intentar procesar su solicitud.");
        }
    }

    return (
        {
            loginElector,
            loginAdmin
        }
    )
}

export default useAuth;