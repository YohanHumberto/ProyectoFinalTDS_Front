import React, { createContext, useState } from 'react';

const DataContextAlerts = createContext();

function AlertContext({ children }) {

    const [alerts, setAlerts] = useState([]);

    function OnRemoveDefault(id) {
        setTimeout(() => {
            RemoveAlertById(id);
        }, 7000)
    }

    function RemoveAlertById(id) {
        setAlerts([...alerts.filter(item => item.id != id)]);
    }

    function Warning(title, mesaje = "", dismisable = true) {
        let alert = { id: Date.now(), type: "warning", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
        OnRemoveDefault(alert.id);
    }

    function Danger(title, mesaje = "", dismisable = true) {
        let alert = { id: Date.now(), type: "danger", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
        OnRemoveDefault(alert.id);
    }

    function Info(title, mesaje = "", dismisable = true) {
        let alert = { id: Date.now(), type: "info", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
        OnRemoveDefault(alert.id);
    }

    function Success(title, mesaje = "", dismisable = true) {
        let alert = { id: Date.now(), type: "success", title: title, mesaje: mesaje, dismisable };
        setAlerts([...alerts, alert]);
        OnRemoveDefault(alert.id);
    }

    const data = {
        alerts, Warning, Danger, Info, Success, RemoveAlertById
    }

    return (
        <DataContextAlerts.Provider value={data}>
            {children}
        </DataContextAlerts.Provider>
    )
}

export { DataContextAlerts };
export default AlertContext;