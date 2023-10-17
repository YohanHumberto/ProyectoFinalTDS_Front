import { useContext } from "react";
import { DataContextAlerts } from "../context/AlertContext";


const useHandleStatusCode = () => {

    const { Warning, Danger, Info, Success } = useContext(DataContextAlerts);

    function OnHandleStatusCode(res) {

        // if (res.status === 200) Success("La solicitud ha tenido éxito.");
        // if (res.status === 204) Success("La solicitud ha tenido éxito, pero no hay contenido que devolver.");
        if (res.status === 201) Success("Recurso creado correctamente.");

        if (res.status === 400) Danger("La solicitud es incorrecta.");
        if (res.status === 401) Danger("Inautorizado, no tiene los permisos necesarios para realizar esta acción.");
        if (res.status === 403) Danger("Prohibido, el servidor se niega a cumplir la solicitud.");
        if (res.status === 404) Danger("No se pudo encontrar el recurso solicitado.");

        if (res.status === 500) Danger("Error interno del servidor.");
        if (res.status === 502) Danger("Pasarela incorrecta, se recibió una respuesta no válida del servidor de origen.");
        if (res.status === 503) Danger("Servicio no disponible en este momento.");
        if (res.status === 504) Danger("Tiempo de espera de la pasarela agotado.");

        return null;

    }

    return ({
        OnHandleStatusCode
    });
}


export default useHandleStatusCode;