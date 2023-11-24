import { Button, Col, FormGroup, Input, Modal, Row } from 'reactstrap';
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';
import ListaCandidatura from './ListaCandidatura.jsx';

const initialValueEleccion = { candidaturas: [], periodo: '', fecha: '' };
const initialValueAsignacion = { idEleccion: 0, idCandidatura: 0 };

const AsignarCandidatura = ({ stateprop, id, setEditModal }) => {
  const {
    candidaturas,
    cargarCandidaturas,
    obtenerCandidaturaPorNivelElectoral,
    agregarCandidatura,
    editarCandidatura,
    eliminarCandidatura,
    elecciones,
    cargarElecciones,
    agregarEleccion,
    asignarCandidatura,
    obtenerEleccionesPorFecha,
    obtenerEleccionPorId,
    nivelElectoral,
    cargarNivelElectoral,
    obtenerNivelElectoral,
  } = useContext(DataContext);
  const [state, setState] = useState({ exampleModal: stateprop });
  const [eleccion, setEleccion] = useState(initialValueEleccion);
  const [asignacion, setAsignacion] = useState(initialValueAsignacion);
  const [listModal, setListModal] = useState({ state: false, data: [] });
  const [nivelElect, setNivelElect] = useState(0);
  const [candid, setCandid] = useState([]);
  const [nvlSelected, setNvlSelected] = useState('Todos');

  useEffect(() => {
    cargarCandidaturas();
    cargarElecciones();
    cargarNivelElectoral();
    setCandid(candidaturas);
  }, []);

  useEffect(() => {
    cargarCandidaturas();

    setState({ exampleModal: stateprop });
    let eleccionFounded = elecciones.find((item) => item.id === id);
    if (eleccionFounded) {
      setEleccion({
        id: eleccionFounded?.id,
        candidaturas: eleccionFounded?.candidaturas,
        periodo: eleccionFounded?.periodo,
        fecha: eleccionFounded?.fecha,
      });
    }
    setCandid(candidaturas);
  }, [stateprop]);

  useEffect(() => {
    cargarCandidaturas();
    setCandid(candidaturas);
    filterCandidaturas(nvlSelected);
  }, [nivelElect]);

  const toggleModal = (param) => {
    setEditModal({ state: !state[param], id: 0 });
    setState({ [param]: !state[param] });
  };

  const nvelHandler = (e) => {
    setAsignacion({
      idEleccion: id,
      idCandidatura: 0,
    });
    const value = parseInt(e.target.value, 10);
    setNivelElect(value);
    setNvlSelected(e.target.options[e.target.selectedIndex].text);
  };

  const filterCandidaturas = (nvl) => {
    if (nvl === '' || nvl === 'Todos') {
      const result = candidaturas.filter((candidatura) => {
        return !eleccion.candidaturas.some(
          (eleccionCandidatura) => eleccionCandidatura.id === candidatura.id
        );
      });
      setCandid((pre) => result);
    } else {
      const result = candidaturas.filter((candidatura) => {
        return (
          candidatura.nivelElectoral.nombre === nvl &&
          !eleccion.candidaturas.some(
            (eleccionCandidatura) => eleccionCandidatura.id === candidatura.id
          )
        );
      });
      setCandid((pre) => result);
    }
  };

  const HandleSumbit = (e) => {
    e.preventDefault();
    if (asignacion.idCandidatura > 0 && asignacion.idEleccion > 0) {
      asignarCandidatura(asignacion);
      setEleccion(initialValueEleccion);
      setAsignacion(initialValueAsignacion);
      setNivelElect(0);
      setState(false);
    }
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={state.exampleModal}
        toggle={() => toggleModal('exampleModal')}
      >
        <ListaCandidatura
          stateprop={listModal.state}
          data={eleccion.candidaturas}
          setListModal={setListModal}
        />
        <form onSubmit={HandleSumbit}>
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">
              Asignar Candidatura
            </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal('exampleModal')}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <FormGroup className="">
              <label className="control-label">ID</label>
              <Input
                placeholder=""
                type="text"
                disabled={true}
                onChange={(e) => e.preventDefault()}
                value={eleccion.id}
              />
            </FormGroup>
            <FormGroup className="">
              <label className="control-label">Periodo</label>
              <Input
                placeholder=""
                type="text"
                disabled={true}
                onChange={(e) => e.preventDefault()}
                value={eleccion.periodo}
              />
            </FormGroup>

            <FormGroup className="">
              <label className="control-label">Fecha</label>
              <Input
                placeholder=""
                type="text"
                disabled={true}
                onChange={(e) => e.preventDefault()}
                value={
                  new Date(eleccion.fecha).getFullYear() +
                  '-' +
                  (new Date(eleccion.fecha).getMonth() + 1)
                    .toString()
                    .padStart(2, '0') +
                  '-' +
                  new Date(eleccion.fecha).getDate().toString().padStart(2, '0')
                }
              />
            </FormGroup>

            <FormGroup className="">
              <label className="control-label">Nivel Electoral</label>
              <select
                className={'form-control'}
                id="candidato"
                onChange={nvelHandler}
                value={nivelElect}
              >
                <option value="0">Todos</option>
                {nivelElectoral.map((nvl) => (
                  <option key={nvl.id} value={nvl.id}>
                    {nvl.nombre}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup className="">
              <label className="control-label">Candidatura</label>
              <select
                className={
                  'form-control ' +
                  (parseInt(asignacion.idCandidatura, 10) === 0
                    ? 'is-invalid'
                    : 'is-valid')
                }
                id="candidato"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setAsignacion({
                    idEleccion: id,
                    idCandidatura: value,
                  });
                }}
                value={asignacion.idCandidatura}
              >
                <option value="0">Seleccione una eleccion</option>
                {candid.map((candidatura) => (
                  <option key={candidatura.id} value={candidatura.id}>
                    {candidatura.id +
                      ' | ' +
                      candidatura.nivelElectoral.nombre +
                      ' | ' +
                      candidatura.candidato.nombre +
                      ' ' +
                      candidatura.candidato.apellido +
                      ' | ' +
                      (candidatura.viceCandidato
                        ? candidatura.viceCandidato.nombre +
                          ' ' +
                          candidatura.viceCandidato.apellido
                        : 'null') +
                      ' | ' +
                      (candidatura.provincia || 'null') +
                      ' | ' +
                      (candidatura.municipio || 'null') +
                      ' | ' +
                      (candidatura.circunscripcion || 'null')}
                  </option>
                ))}
              </select>
            </FormGroup>
            <Row>
              <Col>
                <Button
                  color="secondary"
                  type="button"
                  onClick={() =>
                    setListModal({
                      data: eleccion.candidaturas,
                      state: !listModal.state,
                    })
                  }
                >
                  Ver candidaturas
                </Button>
              </Col>
              <Col className="mr--5">
                <Button color="success" type="submit">
                  Asignar Candidatura
                </Button>
              </Col>
            </Row>
          </div>
          <div className="modal-footer">
            {/*  <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal('exampleModal')}
            >
              Cerrar
            </Button> */}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AsignarCandidatura;
