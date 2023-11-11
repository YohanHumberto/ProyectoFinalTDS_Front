import {
  Button,
  FormGroup,
  Input,
  Modal,
  Dropdown,
  DropdownItem,
} from 'reactstrap';
// core components
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';

const initialValue = {
  idCandidato: 0,
  idNivelElectoral: 0,
  idViceCandidato: 0,
  idProvincia: 0,
  idMunicipio: 0,
  circunscripcion: '',
};

const CreateCandidatura = () => {
  const {
    agregarCandidatura,
    nivelElectoral,
    cargarNivelElectoral,
    obtenerNivelElectoral,
    candidatos,
    cargarCandidatos,
    provincias,
    cargarProvincias,
    obetenerProvincias,
    municipios,
    cargarMunicipios,
    obtenerMunicipio,
  } = useContext(DataContext);
  const [state, setState] = useState({ exampleModal: false });
  const [candidatura, setCandidatura] = useState(initialValue);
  const [selectedProvincia, setSeletedProvincia] = useState('');

  useEffect(() => {
    cargarNivelElectoral();
    cargarCandidatos();
    cargarProvincias();
    cargarMunicipios();
  }, []);

  const toggleModal = (param) => {
    setState({ [param]: !state[param] });
  };

  /* TODO: cambiar la condicion para cada nivel electoral */
  const HandleSumbit = (e) => {
    e.preventDefault();
    if (
      candidatura.idCandidato === 0 &&
      candidatura.idNivelElectoral === 0 &&
      candidatura.idViceCandidato === 0 &&
      candidatura.idProvincia === 0 &&
      candidatura.idMunicipio === 0
    ) {
      agregarCandidatura(candidatura);
      setCandidatura(initialValue);
      setState(false);
    }
  };

  return (
    <>
      <Button
        color="info"
        type="button"
        onClick={() => toggleModal('exampleModal')}
      >
        AGREGAR
      </Button>

      <Modal
        className="modal-dialog-centered"
        isOpen={state.exampleModal}
        toggle={() => toggleModal('exampleModal')}
      >
        <form onSubmit={HandleSumbit}>
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">
              Agregar Candidatura
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
              <label className="control-label">Nivel Electoral</label>
              <select
                className={
                  'form-control ' +
                  (candidatura.idNivelElectoral === ''
                    ? 'is-invalid'
                    : 'is-valid')
                }
                onChange={(e) =>
                  setCandidatura({
                    ...candidatura,
                    idNivelElectoral: e.target.value,
                  })
                }
                value={candidatura.idNivelElectoral}
              >
                <option value="">Seleccione un nivel electoral</option>
                {nivelElectoral.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.nombre}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup className="">
              <label className="control-label">Candidato</label>
              <select
                className={
                  'form-control ' +
                  (candidatura.idCandidato === '' ? 'is-invalid' : 'is-valid')
                }
                onChange={(e) =>
                  setCandidatura({
                    ...candidatura,
                    idCandidato: e.target.value,
                  })
                }
                value={candidatura.idCandidato}
              >
                <option value="">Seleccione un candidato</option>
                {candidatos.map((candidato) => (
                  <option key={candidato.id} value={candidato.id}>
                    {candidato.nombre + ' ' + candidato.apellido}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup className="">
              <label className="control-label">Provincia</label>
              <select
                className={
                  'form-control ' +
                  (candidatura.idProvincia === '' ? 'is-invalid' : 'is-valid')
                }
                onChange={(e) => {
                  setCandidatura({
                    ...candidatura,
                    idProvincia: e.target.value,
                  });
                }}
                value={candidatura.idProvincia}
              >
                <option value="">Seleccione una provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                    {/* setSeletedProvincia(provincia.nombre) */}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup className="">
              <label className="control-label">Municipio</label>
              <select
                className={
                  'form-control ' +
                  (candidatura.idMunicipio === '' ? 'is-invalid' : 'is-valid')
                }
                onChange={(e) =>
                  setCandidatura({
                    ...candidatura,
                    idMunicipio: e.target.value,
                  })
                }
                value={candidatura.idMunicipio}
              >
                <option value="">Seleccione un municipio</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup className="">
              <label className="control-label">Circunscripcion</label>
              <input
                type="text"
                className={
                  'form-control ' +
                  (candidatura.circunscripcion === ''
                    ? 'is-invalid'
                    : 'is-valid')
                }
                onChange={(e) =>
                  setCandidatura({
                    ...candidatura,
                    circunscripcion: e.target.value,
                  })
                }
                value={candidatura.circunscripcion}
              ></input>
            </FormGroup>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleModal('exampleModal')}
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
