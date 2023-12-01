import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHandleStatusCode from '../helpers/HandleStatusCode';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function useAuth() {

    const { Danger } = useContext(DataContextAlerts);
    const { OnHandleStatusCode } = useHandleStatusCode();
 
    let service = new AuthService();

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

    const Logout = () => {
        localStorage.removeItem("token");
        swal("Cierre de sesión", "¡Has cerrado sesión correctamente!", "success");
    }

    const LogoutElector = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("votos");
        swal("Votación completada", "¡Has completado la votación exitosamente! Gracias por tu participación.", "success");
    }

    return (
        {
            loginElector,
            loginAdmin,
            Logout,
            LogoutElector
        }
    )
}

export default useAuth;