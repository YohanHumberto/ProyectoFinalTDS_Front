import {
    Button,
    FormGroup,
    Input,
    Modal,
} from "reactstrap";
// core components
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect, useState } from "react";

const initialValuePartido = { nombre: "", siglas: "", logoUrl: "" };

const Create = () => {

    const { agregarPartido } = useContext(DataContext);
    const [state, setState] = useState({ exampleModal: false });
    const [partido, setPartido] = useState(initialValuePartido);

    const toggleModal = param => {
        setState({ [param]: !state[param] });
    };

    const HandleSumbit = (e) => {
        e.preventDefault();
        if (partido.nombre != "" && partido.siglas != "" && partido.logoUrl != "") {
            agregarPartido(partido);
            setPartido(initialValuePartido)
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
                            Agregar partido
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
                            <label className="control-label">Nombre</label>
                            <Input placeholder="partido de la independencia nacional" type="text"
                                className={partido.nombre == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setPartido({ ...partido, nombre: e.target.value })} value={partido.nombre} />
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Siglas</label>
                            <Input placeholder="PRSC" type="text"
                                className={partido.siglas == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setPartido({ ...partido, siglas: e.target.value })} value={partido.siglas} />
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Logo url</label>
                            <Input placeholder="https://midominio/logo.png" type="url"
                                className={partido.logoUrl == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setPartido({ ...partido, logoUrl: e.target.value })} value={partido.logoUrl} />
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

export default Create;