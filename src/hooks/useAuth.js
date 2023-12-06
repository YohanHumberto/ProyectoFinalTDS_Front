import { useContext, useState } from 'react';
import { DataContextAlerts } from '../context/AlertContext';
import useHandleStatusCode from '../helpers/HandleStatusCode';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { jwtDecode } from 'jwt-decode';

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
        localStorage.removeItem("cedula");
        localStorage.removeItem("ciudadano");
        swal("Votación completada", "¡Has completado la votación exitosamente! Gracias por tu participación.", "success");
    }

    //#region JWT

    const seccionIsValid = () => {
        const token = localStorage.getItem("token");
        if(!token) return false;

        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000;
        const ahora = new Date().getTime();

        return ahora < exp;
    }

    const userIsAdmin = () => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        return decoded?.rol == "Encargado";
    }

    //#endregion

    return (
        {
            loginElector,
            loginAdmin,
            Logout,
            LogoutElector,
            seccionIsValid,
            userIsAdmin
        }
    )
}

export default useAuth;