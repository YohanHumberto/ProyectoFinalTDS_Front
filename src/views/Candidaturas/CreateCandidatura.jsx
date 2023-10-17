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
    idCandidato: 0,
    idNivelElectoral: 0,
    idViceCandidato: 0,
    idProvincia: 0,
    idMunicipio: 0,
    circunscripcion: ""
};

const CreateCandidatura = () => {

    const { agregarCandidatura } = useContext(DataContext);
    const [state, setState] = useState({ exampleModal: false });
    const [candidatura, setCandidatura] = useState(initialValue);

    const toggleModal = param => {
        setState({ [param]: !state[param] });
    };

    const HandleSumbit = (e) => {
        e.preventDefault();
        if (candidatura.idCandidato === 0 && candidatura.idNivelElectoral === 0 && candidatura.idViceCandidato === 0
            && candidatura.idProvincia === 0&& candidatura.idMunicipio === 0) {
            agregarCandidatura(candidatura);
            setCandidatura(initialValue)
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
                                className={candidatura.nombre == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setCandidatura({ ...candidatura, nombre: e.target.value })} value={candidatura.nombre} />
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Siglas</label>
                            <Input placeholder="PRSC" type="text"
                                className={candidatura.siglas == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setCandidatura({ ...candidatura, siglas: e.target.value })} value={candidatura.siglas} />
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Logo url</label>
                            <Input placeholder="https://midominio/logo.png" type="url"
                                className={candidatura.logoUrl == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setCandidatura({ ...candidatura, logoUrl: e.target.value })} value={candidatura.logoUrl} />
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

export default CreateCandidatura;