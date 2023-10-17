import { Fragment, useContext } from "react";
import { Alert, UncontrolledAlert } from "reactstrap";
import { DataContextAlerts } from "../../context/AlertContext";

const CustomAlert = () => {

  const { alerts } = useContext(DataContextAlerts);

  return (
    <>
      {
        alerts.map((alert, index) => {
          return (
            <Fragment key={index}>
              {alert.dismisable ?
                <UncontrolledAlert key={index} className={"alert-" + alert.type} fade={true}>
                  <span className="alert-inner--text">
                    <strong>{alert.title}</strong>  {alert.mesaje}
                  </span>
                </UncontrolledAlert>
                :
                <Alert key={index} color={alert.type}>
                  <strong>{alert.title}!</strong>  {alert.mesaje}
                </Alert>
              }
            </Fragment>
          );
        })
      }
    </>
  );
};

export default CustomAlert;
