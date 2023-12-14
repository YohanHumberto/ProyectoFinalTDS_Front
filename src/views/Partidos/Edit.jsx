import { Button, FormGroup, Input, Modal, } from "reactstrap";
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigation } from "react-router-dom";

const initialValuePartido = { nombre: "", siglas: "", logoUrl: "" };

const Edit = ({ stateprop, id, setEditModal }) => {

    const { editarPartido, partidos } = useContext(DataContext);
    const [state, setState] = useState({ exampleModal: stateprop });
    const [partido, setPartido] = useState(initialValuePartido);

    useEffect(() => {
        setState({ exampleModal: stateprop })
        let partidoFinded = partidos.find(item => item.id == id);
        if (partidoFinded) setPartido(partidoFinded);
    }, [stateprop]);

    const toggleModal = (param) => {
        setEditModal({ state: !state[param], id: 0 })
        setState({ [param]: !state[param] });
    };

    const HandleSumbit = (e) => {
        e.preventDefault();
        if (partido.nombre != "" && partido.siglas != "" && partido.logoUrl != "") {
            editarPartido(partido);
            setPartido(initialValuePartido)
            setState(false);
        }
    }

    return (
        <>
            <Modal
                className="modal-dialog-centered"
                isOpen={state.exampleModal}
                toggle={() => toggleModal("exampleModal")}
            >
                <form onSubmit={HandleSumbit}>
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLabel">
                            Editar partido
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

export default Edit;