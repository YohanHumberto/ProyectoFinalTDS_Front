import {
    Button,
    FormGroup,
    Input,
    Modal,
} from "reactstrap";
// core components
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect, useState } from "react";

const initialValue = {
    fecha: "",
};

const CreateEleccion = () => {

    const { agregarEleccion } = useContext(DataContext);
    const [state, setState] = useState({ exampleModal: false });
    const [eleccion, setEleccion] = useState(initialValue);

    const toggleModal = param => {
        setState({ [param]: !state[param] });
    };

    const HandleSumbit = (e) => {
        e.preventDefault();
        if (eleccion.fecha != "") {
            agregarEleccion(eleccion);
            setEleccion(initialValue)
            setState(false);
        }
    }

    return (
        <>
            <Button
                color="info"
                type="button"
                onClick={() => toggleModal("exampleModal")}
            >
                AGREGAR
            </Button>

            <Modal
                className="modal-dialog-centered"
                isOpen={state.exampleModal}
                toggle={() => toggleModal("exampleModal")}
            >
                <form onSubmit={HandleSumbit}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">
                            Agregar eleccion
                        </h4>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => toggleModal("exampleModal")}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <FormGroup className="">
                            <label className="control-label">Fecha</label>
                            <Input type="date"
                                className={eleccion.fecha == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setEleccion({ ...eleccion, fecha: e.target.value })} value={eleccion.nombre} />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => toggleModal("exampleModal")}
                        >
                            Cerrar
                        </Button>
                        <Button color="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateEleccion;