import React, { createContext, useState } from 'react';

const DataContextAlerts = createContext();

function AlertContext({ children }) {

    const [alerts, setAlerts] = useState([]);

    function Warning(title, mesaje = "", dismisable = true) {
        let alert = { type: "warning", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
    }

    function Danger(title, mesaje = "", dismisable = true) {
        let alert = { type: "danger", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
    }

    function Info(title, mesaje = "", dismisable = true) {
        let alert = { type: "info", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
    }

    function Success(title, mesaje = "", dismisable = true) {
        let alert = { type: "success", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
    }

    const data = {
        alerts, Warning, Danger, Info, Success
    }

    return (
        <DataContextAlerts.Provider value={data}>
            {children}
        </DataContextAlerts.Provider>
    )
}

export { DataContextAlerts };
export default AlertContext;