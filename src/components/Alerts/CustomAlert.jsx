import { Fragment, useContext } from "react";
import { Alert, UncontrolledAlert } from "reactstrap";
import { DataContextAlerts } from "../../context/AlertContext";

const CustomAlert = () => {

  const { alerts, RemoveAlertById } = useContext(DataContextAlerts);

  return (
    <>
      {
        alerts.map((alert, index) => {
          return (
            <Fragment key={index}>
              {/* {alert.dismisable ?
                <UncontrolledAlert onClick={()=>RemoveAlertById(alert.id)} key={index} className={"alert-" + alert.type} fade={true}>
                  <span className="alert-inner--text">
                    <strong>{alert.title}</strong>  {alert.mesaje}
                  </span>
                  <i className="ni fat-remove"></i>
                </UncontrolledAlert>
                : */}
                <Alert key={index} color={alert.type}>
                  <strong>{alert.title}</strong>  {alert.mesaje}
                  <button  onClick={()=>RemoveAlertById(alert.id)} type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                </Alert>
              {/* } */}
            </Fragment>
          );
        })
      }
    </>
  );
};

export default CustomAlert;
