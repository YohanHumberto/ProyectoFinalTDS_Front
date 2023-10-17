import { Button, Col, FormGroup, Input, Modal, Row, } from "reactstrap";
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigation } from "react-router-dom";

const initialValuePartido = { nombre: "", apellido: "", apodo: "", cedula: "", idCargoElectoral: "", idPartido: "", fotoUrl: "" };

const EditCandidato = ({ stateprop, id, setEditModal }) => {

    const { agregarCandidato, partidos, candidatos, cargarPartidos, cargosElectorales, cargarCargosElectorales } = useContext(DataContext);
    const [state, setState] = useState({ exampleModal: stateprop });
    const [candidato, setCandidato] = useState(initialValuePartido);

    useEffect(() => {
        cargarPartidos();
        cargarCargosElectorales();
    }, []);

    useEffect(() => {
        setState({ exampleModal: stateprop })
        let candidatoFinded = candidatos.find(item => item.id == id);
        console.log(candidatoFinded)
        if (candidatoFinded) setCandidato(candidatoFinded);
    }, [stateprop]);

    const toggleModal = (param) => {
        setEditModal({ state: !state[param], id: 0 })
        setState({ [param]: !state[param] });
    };

    const HandleSumbit = (e) => {
        e.preventDefault();
        if (candidato.nombre != "" && candidato.apellido == "" && candidato.apodo == "" && candidato.cedula == "" && candidato.idCargoElectoral == "" && candidato.idPartido == "" && candidato.fotoUrl == "") {
            agregarCandidato(candidato);
            setCandidato(initialValuePartido)
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
                            Editar candidato
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
                        <Row>
                            <Col md="6">
                                <FormGroup className="">
                                    <label className="control-label">Nombre</label>
                                    <Input placeholder="" type="text"
                                        className={candidato.nombre == "" ? "is-invalid" : "is-valid"}
                                        onChange={(e) => setCandidato({ ...candidato, nombre: e.target.value })} value={candidato.nombre} />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="">
                                    <label className="control-label">Apellido</label>
                                    <Input placeholder="" type="text"
                                        className={candidato.apellido == "" ? "is-invalid" : "is-valid"}
                                        onChange={(e) => setCandidato({ ...candidato, apellido: e.target.value })} value={candidato.apellido} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup className="">
                            <label className="control-label">Cedula</label>
                            <Input placeholder="" type="text"
                                className={candidato.cedula == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setCandidato({ ...candidato, cedula: e.target.value })} value={candidato.cedula} />
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Cargo Electoral</label>
                            <select className={"form-control " + (candidato.idCargoElectoral == "" ? "is-invalid" : "is-valid")}
                                onChange={(e) => setCandidato({ ...candidato, idCargoElectoral: e.target.value })} value={candidato.idCargoElectoral} >
                                <option value="">Seleccione un cargo electoral</option>
                                {cargosElectorales.map(cargo => <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>)}
                            </select>
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Partido</label>
                            <select className={"form-control " + (candidato.idPartido == "" ? "is-invalid" : "is-valid")}
                                onChange={(e) => setCandidato({ ...candidato, idPartido: e.target.value })} value={candidato.idPartido} >
                                <option value="">Seleccione un partido</option>
                                {partidos.map(partido => <option key={partido.id} value={partido.id}>{partido.nombre}</option>)}
                            </select>
                        </FormGroup>
                        <FormGroup className="">
                            <label className="control-label">Foto url</label>
                            <Input placeholder="https://midominio/logo.png" type="url"
                                className={candidato.fotoUrl == "" ? "is-invalid" : "is-valid"}
                                onChange={(e) => setCandidato({ ...candidato, fotoUrl: e.target.value })} value={candidato.fotoUrl} />
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

export default EditCandidato;