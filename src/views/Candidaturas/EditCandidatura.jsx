import { Button, FormGroup, Modal, FormText } from 'reactstrap';
// core components
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';

const initialValue = {
  idCandidato: 0,
  idNivelElectoral: 0,
  idViceCandidato: 0,
  idProvincia: 0,
  idMunicipio: 0,
  circunscripcion: 0,
};

const EditCandidatura = ({ stateprop, id, setEditModal }) => {
  const {
    agregarCandidatura,
    nivelElectoral,
    cargarNivelElectoral,
    candidatos,
    cargarCandidatos,
    provincias,
    cargarProvincias,
    municipios,
    cargarMunicipios,
    candidaturas,
    cargarCandidaturas,
    editarCandidatura,
  } = useContext(DataContext);

  const [state, setState] = useState({ exampleModal: stateprop });
  const [candidatura, setCandidatura] = useState(initialValue);
  const [candidato, setCandidato] = useState(candidatos);
  const [viceCandidato, setViceCandidato] = useState(candidatos);

  /* Campos requeridos */
  const [rProvincia, setRProvincia] = useState(false);
  const [rMunicipio, setRMunicipio] = useState(false);
  const [rViceCandidato, setRViceCandidato] = useState(false);
  const [rRegidor, setRegidor] = useState(false);
  const [rCircunscripcion, setRCircunscripcion] = useState(false);

  const [fProvincia, setFProvincia] = useState(0);
  const [fMunicipio, setFMunicipio] = useState(0);
  const [fViceCandidato, setFViceCandidato] = useState(0);
  const [fRegidor, setFRegidor] = useState(0);
  const [fCircunscripcion, setFCircunscripcion] = useState(0);
  const [fCandidato, setFCandidato] = useState(0);

  const setRequisitpNivelElectoral = (nivelElectoral) => {
    switch (nivelElectoral) {
      case 'Diputación' || 3:
        setRMunicipio(true);
        setRProvincia(true);
        setRViceCandidato(false);
        setRegidor(false);
        setRCircunscripcion(true);
        break;
      case 'Municipal' || 4:
        setRMunicipio(true);
        setRProvincia(true);
        setRViceCandidato(true);
        setRegidor(true);
        setRCircunscripcion(false);
        break;
      case 'Presidencial' || 1:
        setRMunicipio(false);
        setRProvincia(false);
        setRViceCandidato(true);
        setRegidor(false);
        setRCircunscripcion(false);
        break;
      case 'Senatorial' || 2:
        setRMunicipio(false);
        setRProvincia(true);
        setRViceCandidato(false);
        setRegidor(false);
        setRCircunscripcion(false);
        break;

      default:
        setRMunicipio(false);
        setRProvincia(false);
        setRViceCandidato(false);
        setRegidor(false);
        setRCircunscripcion(false);
        break;
    }
  };

  const cambiarCandidatosNum = (nvel) => {
    if (nvel === 3) {
      return ['Diputado'];
    } else if (nvel === 2) {
      return ['Senador'];
    } else if (nvel === 1) {
      return ['Presidente', 'Vice Presidente'];
    } else if (nvel === 4) {
      return ['Alcalde', 'Vice Alcalde', 'Regidor'];
    }

    return '';
  };

  const cambiarCandidatos = (nvel) => {
    if (nvel === 'Diputación') {
      return ['Diputado'];
    } else if (nvel === 'Senatorial') {
      return ['Senador'];
    } else if (nvel === 'Presidencial') {
      return ['Presidente', 'Vice Presidente'];
    } else if (nvel === 'Municipal') {
      return ['Alcalde', 'Vice Alcalde', 'Regidor'];
    }

    return '';
  };

  const filterCandidatos = (cargoElectoral) => {
    if (cargoElectoral.length === 1) {
      const candi = candidatos.filter(
        (candidato) =>
          candidato.cargoElectoral.nombre === cargoElectoral[0] /* &&
          !candidaturas.some((c) => c.candidato?.id === candidato.id) */
      );
      setCandidato(candi);
    } else if (cargoElectoral.length === 2) {
      const candi = candidatos.filter(
        (candidato) =>
          candidato.cargoElectoral.nombre === cargoElectoral[0] /* &&
          !candidaturas.some((c) => c.candidato?.id === candidato.id) */
      );
      const vice = candidatos.filter(
        (candidato) =>
          candidato.cargoElectoral.nombre === cargoElectoral[1] /* &&
          !candidaturas.some((c) => c.viceCandidato?.id === candidato.id) */
      );
      setCandidato(candi);
      setViceCandidato(vice);
    } else if (cargoElectoral.length === 3) {
      const candi = candidatos.filter(
        (candidato) =>
          candidato.cargoElectoral.nombre === cargoElectoral[0] /* &&
            !candidaturas.some((c) => c.candidato?.id === candidato.id) */ ||
          candidato.cargoElectoral.nombre === cargoElectoral[2] /* &&
            !candidaturas.some((c) => c.candidato?.id === candidato.id) */
      );
      const vice = candidatos.filter(
        (candidato) =>
          candidato.cargoElectoral.nombre === cargoElectoral[1] /* &&
          !candidaturas.some((c) => c.viceCandidato?.id === candidato.id) */
      );
      console.log({ candi });
      setCandidato(candi);
      setViceCandidato(vice);
    }
  };

  const setAllField = (status = false) => {
    setRMunicipio(status);
    setRProvincia(status);
    setRViceCandidato(status);
    setRegidor(status);
    setRCircunscripcion(status);
  };

  const nivelElectoralOnChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFCandidato(0);
    setFCircunscripcion(0);
    setFMunicipio(0);
    setFRegidor(0);
    setFProvincia(0);
    setFViceCandidato(0);

    const nivelElectoral = e.target.options[e.target.selectedIndex].text;
    setRequisitpNivelElectoral(nivelElectoral);
    //filterCandidatos(cambiarCandidatos(nivelElectoral));
    setCandidatura((prevCandidatura) => initialValue);
    let candidaturasFinded = candidaturas.find((item) => item.id === id);
    setCandidatura({
      id: candidaturasFinded.id,
    });
    setCandidatura((prevCandidatura) => ({
      ...prevCandidatura,
      idNivelElectoral: value,
    }));
  };

  useEffect(() => {
    setState({ exampleModal: stateprop });
    cargarNivelElectoral();
    cargarProvincias();
    cargarMunicipios();
    cargarCandidatos();
    cargarCandidaturas();
    let candidaturasFinded = candidaturas.find((item) => item.id === id);
    if (candidaturasFinded) {
      setCandidatura((s) => ({
        id: candidaturasFinded.id,
        idCandidato: candidaturasFinded.candidato.id
          ? candidaturasFinded.candidato.id
          : 0,
        idNivelElectoral: candidaturasFinded.nivelElectoral?.id || 0,
        idViceCandidato: candidaturasFinded.viceCandidato?.id || 0,
        idProvincia: candidaturasFinded?.provincia
          ? provincias.find((p) => p.nombre === candidaturasFinded?.provincia)
              .id
          : 0,
        idMunicipio: candidaturasFinded?.municipio
          ? municipios.find((m) => m.nombre === candidaturasFinded?.municipio)
              .id
          : 0,
        circunscripcion: candidaturasFinded.circunscripcion || 0,
      }));
      setFCandidato((s) => candidaturasFinded.candidato?.id || 0);
      setFViceCandidato((s) => candidaturasFinded.viceCandidato?.id || 0);

      setFCircunscripcion((s) => candidaturasFinded.circunscripcion || 0);

      setFProvincia((s) => {
        if (candidaturasFinded?.provincia) {
          cargarMunicipios(candidaturasFinded?.provincia);
          return provincias.find(
            (p) => p.nombre === candidaturasFinded?.provincia
          ).id;
        } else {
          return 0;
        }
      });
      setFMunicipio((s) =>
        candidaturasFinded?.municipio
          ? municipios.find((m) => m.nombre === candidaturasFinded?.municipio)
              .id
          : 0
      );

      setRequisitpNivelElectoral(candidaturasFinded.nivelElectoral.nombre);
      // campos requeridos
      /* setRViceCandidato((s) =>
        candidaturasFinded.viceCandidato?.id ? true : false
      );
      setRProvincia((s) => (candidaturasFinded?.provincia ? true : false));
      setRMunicipio((s) => (candidaturasFinded?.municipio ? true : false));
      setRCircunscripcion((s) =>
        candidaturasFinded.circunscripcion ? true : false
      ); */
      console.log(candidaturasFinded.nivelElectoral?.id);
      filterCandidatos(
        cambiarCandidatosNum(candidaturasFinded.nivelElectoral?.id)
      );
    }
  }, [stateprop]);

  const toggleModal = (param) => {
    setEditModal({ state: !state[param], id: 0 });
    setState({ [param]: !state[param] });
    setCandidatura((prevCandidatura) => initialValue);
    setAllField();
  };

  /* TODO: cambiar la condicion para cada nivel electoral */
  const HandleSumbit = (e) => {
    console.log(candidatura);
    console.log(rViceCandidato);
    e.preventDefault();
    for (let key in candidatura) {
      if (candidatura[key] === 0) {
        candidatura[key] = null;
      }
    }

    if (candidatura.idNivelElectoral === 3) {
      if (
        candidatura.idCandidato !== 0 &&
        candidatura.idCandidato !== null &&
        candidatura.idNivelElectoral !== 0 &&
        candidatura.idNivelElectoral !== null &&
        candidatura.idProvincia !== null &&
        candidatura.idProvincia !== 0 &&
        candidatura.idMunicipio !== null &&
        candidatura.idMunicipio !== 0
        //candidatura.circunscripcion !== 0 &&
        //candidatura.circunscripcion !== null
      ) {
        editarCandidatura(candidatura);
        setCandidatura((prevCandidatura) => initialValue);
        setAllField();
        setState(false);
      } else {
        console.error('Faltan campos en diputacion');
      }
    } else if (candidatura.idNivelElectoral === 4 && rViceCandidato === false) {
      candidatura.idViceCandidato = null;
      if (
        candidatura.idCandidato !== 0 &&
        candidatura.idCandidato !== null &&
        candidatura.idNivelElectoral !== 0 &&
        candidatura.idNivelElectoral !== null &&
        candidatura.idProvincia !== null &&
        candidatura.idProvincia !== 0 &&
        (candidatura.idViceCandidato === null ||
          candidatura.idViceCandidato === 0) &&
        //candidatura.idViceCandidato !== null &&
        candidatura.idMunicipio !== 0 &&
        candidatura.idMunicipio !== null
      ) {
        editarCandidatura(candidatura);
        setCandidatura((prevCandidatura) => initialValue);
        setAllField();
        setState(false);
      } else {
        console.error('Faltan campos en municipio');
      }
    } else if (candidatura.idNivelElectoral === 4) {
      if (
        candidatura.idCandidato !== 0 &&
        candidatura.idCandidato !== null &&
        candidatura.idNivelElectoral !== 0 &&
        candidatura.idNivelElectoral !== null &&
        candidatura.idProvincia !== null &&
        candidatura.idProvincia !== 0 &&
        candidatura.idViceCandidato !== 0 &&
        candidatura.idViceCandidato !== null &&
        candidatura.idMunicipio !== 0 &&
        candidatura.idMunicipio !== null
      ) {
        editarCandidatura(candidatura);
        setCandidatura((prevCandidatura) => initialValue);
        setAllField();
        setState(false);
      } else {
        console.error('Faltan campos en municipio');
      }
    } else if (candidatura.idNivelElectoral === 1) {
      if (
        candidatura.idCandidato !== 0 &&
        candidatura.idCandidato !== null &&
        candidatura.idNivelElectoral !== 0 &&
        candidatura.idNivelElectoral !== null &&
        candidatura.idViceCandidato !== 0 &&
        candidatura.idViceCandidato !== null
      ) {
        editarCandidatura(candidatura);
        setCandidatura((prevCandidatura) => initialValue);
        setAllField();
        setState(false);
      } else {
        console.error('Faltan campos en presidente');
      }
    } else if (candidatura.idNivelElectoral === 2) {
      if (
        candidatura.idCandidato !== 0 &&
        candidatura.idCandidato !== null &&
        candidatura.idNivelElectoral !== 0 &&
        candidatura.idNivelElectoral !== null &&
        candidatura.idProvincia !== 0 &&
        candidatura.idProvincia !== null
      ) {
        editarCandidatura(candidatura);
        setCandidatura((prevCandidatura) => initialValue);
        setAllField();
        setState(false);
      } else {
        console.error('Faltan campos en senatorial');
      }
    }
  };

  return (
    <>
      {/* <Button
        color="info"
        type="button"
        onClick={() => toggleModal('exampleModal')}
      >
        AGREGAR
      </Button> */}

      <Modal
        className="modal-dialog-centered"
        isOpen={state.exampleModal}
        toggle={() => toggleModal('exampleModal')}
      >
        <form onSubmit={HandleSumbit}>
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel">
              Editar Candidatura
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
              <input
                className={'form-control'}
                type="text"
                value={id}
                disabled
              />
            </FormGroup>
            <FormGroup className="">
              <label className="control-label">Nivel Electoral</label>
              <select
                className={
                  'form-control ' +
                  (candidatura.idNivelElectoral === 0
                    ? 'is-invalid'
                    : 'is-valid')
                }
                onChange={nivelElectoralOnChange}
                value={candidatura.idNivelElectoral}
                disabled
              >
                <option value="0">Seleccione un nivel electoral</option>
                {nivelElectoral.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.nombre}
                  </option>
                ))}
              </select>
            </FormGroup>

            {candidatura.idNivelElectoral !== 0 && (
              <FormGroup className="">
                <label className="control-label">Candidato</label>
                <select
                  className={
                    'form-control ' +
                    (fCandidato == 0 ? 'is-invalid' : 'is-valid')
                  }
                  id="candidato"
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setCandidatura((s) => ({
                      ...candidatura,
                      idCandidato: value,
                    }));
                    setFCandidato(value);

                    const valueInText =
                      e.target.options[e.target.selectedIndex].text;
                    if (candidatura.idNivelElectoral === 4)
                      setRViceCandidato(true);

                    if (valueInText.split('|')[0].trim().includes('Regidor')) {
                      setRViceCandidato(false);
                      setFViceCandidato(0);
                      candidatura.idViceCandidato = 0;
                      console.log('entre');
                      console.log(candidatura);
                    }
                  }}
                  onClick={(e) => console.log(fCandidato)}
                  value={fCandidato}
                >
                  <option value="0">Seleccione un candidato</option>
                  {candidato.map((candidato) => (
                    <option key={candidato.id} value={candidato.id}>
                      {candidato.cargoElectoral.nombre +
                        ' | ' +
                        candidato.nombre +
                        ' ' +
                        candidato.apellido +
                        ' | ' +
                        candidato.partido.nombre}
                    </option>
                  ))}
                </select>
              </FormGroup>
            )}

            {rViceCandidato && (
              <FormGroup className="">
                <label className="control-label">Vice Candidato</label>
                <select
                  className={
                    'form-control ' +
                    (fViceCandidato === 0 ? 'is-invalid' : 'is-valid')
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setCandidatura({
                      ...candidatura,
                      idViceCandidato: value,
                    });
                    setFViceCandidato(value);
                  }}
                  value={fViceCandidato}
                >
                  <option value="0">Seleccione un vice candidato</option>
                  {viceCandidato.map((candidato) => (
                    <option key={candidato.id} value={candidato.id}>
                      {candidato.cargoElectoral.nombre +
                        ' | ' +
                        candidato.nombre +
                        ' ' +
                        candidato.apellido +
                        ' | ' +
                        candidato.partido.nombre}
                    </option>
                  ))}
                </select>
              </FormGroup>
            )}

            {rProvincia && (
              <FormGroup className="">
                <label className="control-label">Provincia</label>
                <select
                  className={
                    'form-control ' +
                    (fProvincia === 0 ? 'is-invalid' : 'is-valid')
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setCandidatura({
                      ...candidatura,
                      idProvincia: value,
                    });
                    cargarMunicipios(
                      e.target.options[e.target.selectedIndex].text
                    );
                    setFProvincia(value);
                  }}
                  value={fProvincia}
                >
                  <option value="0">Seleccione una provincia</option>
                  {provincias.map((provincia) => (
                    <option key={provincia.id} value={provincia.id}>
                      {provincia.nombre}
                      {/* setSeletedProvincia(provincia.nombre) */}
                    </option>
                  ))}
                </select>
              </FormGroup>
            )}

            {rMunicipio && (
              <FormGroup className="">
                <label className="control-label">Municipio</label>
                <select
                  className={
                    'form-control ' +
                    (fMunicipio === 0 ? 'is-invalid' : 'is-valid')
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setCandidatura({
                      ...candidatura,
                      idMunicipio: value,
                    });
                    setFMunicipio(value);
                  }}
                  value={fMunicipio}
                >
                  <option value="0">Seleccione un municipio</option>
                  {municipios.map((municipio) => (
                    <option key={municipio.id} value={municipio.id}>
                      {municipio.nombre}
                    </option>
                  ))}
                </select>
              </FormGroup>
            )}

            {rCircunscripcion && (
              <FormGroup className="">
                <label className="control-label">Circunscripcion</label>
                <input
                  type="number"
                  className={
                    'form-control ' +
                    (candidatura.idNivelElectoral === 3
                      ? ''
                      : fCircunscripcion === 0
                      ? 'is-invalid'
                      : 'is-valid')
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setCandidatura({
                      ...candidatura,
                      circunscripcion: value,
                    });
                    setFCircunscripcion(value);
                  }}
                  value={fCircunscripcion}
                  min={0}
                ></input>
                {candidatura.idNivelElectoral === 3 && (
                  <FormText>Esta opción es opcional *</FormText>
                )}
              </FormGroup>
            )}
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

export default EditCandidatura;
