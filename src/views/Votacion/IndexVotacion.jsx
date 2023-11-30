import M from '../../assets/img/M.svg'
import D from '../../assets/img/D.svg'
import S from '../../assets/img/S.svg'
import P from '../../assets/img/P.svg'
import { Link, useNavigate } from 'react-router-dom';
import VotacionNavbar from '../../components/Navbars/VotacionNavbar';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/GlobalContext';

const IndexVotacion = () => {

    let carStyles = {
        width: "240px",
        height: "360px",
        background: "#c18e3f",
        padding: "20px",
        paddingLeft: "16px",
        borderRadius: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "Column",
        justifyContent: "center",
    };

    let carStylesp = {
        width: "240px",
        height: "360px",
        padding: "10px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    };

    let col = {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    }

    const { obtenerEleccionesPorFecha, enviarVoto } = useContext(DataContext);
    const [eleccion, setEleccion] = useState([]);
    const [votos, setVotos] = useState({
        votoDiputacion: -1,
        votoSenatorial: -1,
        votoPresidencial: -1,
        votoMunicipal: -1,
        votoMunicipalRegidor: -1
    });
    const [stados, setEstados] = useState({
        municipal: false,
        diputacion: false,
        senatorial: false,
        presidencial: false
    });
    const [btnSaveActive, setBtnSaveActive] = useState(false);
    const navigation = useNavigate();

    let getELeccion = async () => {
        let data = await obtenerEleccionesPorFecha("2023-11-15T00:00:00");
        setEleccion(data);
        setEstados({
            municipal: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Municipal").length > 0,
            diputacion: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Diputación").length > 0,
            senatorial: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Senatorial").length > 0,
            presidencial: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Presidencial").length > 0
        });
    }

    useEffect(() => {
        setVotos(JSON.parse(window.localStorage.getItem("votos")) ?? votos);
        if (eleccion.length > 0) {
            window.localStorage.setItem("votos", JSON.stringify({
                votoDiputacion: stados.diputacion ? -1 : 0,
                votoSenatorial: stados.senatorial ? -1 : 0,
                votoPresidencial: stados.presidencial ? -1 : 0,
                votoMunicipal: stados.municipal ? -1 : 0,
                votoMunicipalRegidor: stados.municipal ? -1 : 0
            }));
        }
    }, [stados]);

    useEffect(() => {
        let state = (votos.votoDiputacion >= 0 || !stados.diputacion) && (votos.votoSenatorial >= 0 || !stados.senatorial)
            && (votos.votoPresidencial >= 0 || !stados.presidencial) && (votos.votoMunicipal >= 0 || !stados.municipal);
        if (state != btnSaveActive) setBtnSaveActive(state);
    }, [btnSaveActive])

    useEffect(() => {
        getELeccion();
        console.log(stados)
        console.log(JSON.parse(window.localStorage.getItem("votos")))
    }, []);

    const HandleClickBtnSave = async () => {
        let obj = {
            "candidaturaPresidencial": votos.votoMunicipal,
            "candidaturaSenatorial": votos.votoSenatorial,
            "candidaturaDiputacion": votos.votoDiputacion > 0 ? votos.votoDiputacion : 0,
            "candidaturaAlcalde": votos.votoMunicipal,
            "candidaturaRegidores": votos.votoMunicipalRegidor
        };
        let res = await enviarVoto(obj);
        if (res?.ok) {
            alert("Votacion realizada exitosamente");
            navigation("/");
        }
    }

    return (
        <>
            <VotacionNavbar title={"NIVELES ELECTORALES"} periodo={eleccion?.periodo} fecha={eleccion?.fecha} />
            <div style={{ minHeight: "81vh", background: "#c7c8ca" }}>
                <div className="row m-0 p-2 m-auto pt-5" style={{ justifyContent: "center", gap: "1rem" }}>
                    <div className='col-12 d-flex justify-content-end'>
                        <button className={`btn btn-warning`}
                            disabled={btnSaveActive ? false : "disabled"}
                            style={{ background: "rgb(193, 142, 63)", borderColor: "rgb(193, 142, 63)" }}
                            onClick={HandleClickBtnSave}>GUARDAR</button>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelMunicipal" style={carStyles}
                                className={`btn btn-outline-dark border border-dark ${!stados.municipal || votos.votoMunicipal > -1 ? "disabled" : ""}`}>
                                <img src={M} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Municipal</h3>
                        </div>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelDiputacion" style={carStyles}
                                className={`btn btn-outline-dark border border-dark ${!stados.diputacion || votos?.votoDiputacion > -1 ? "disabled" : ""}`}>
                                <img src={D} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Diputacion</h3>
                        </div>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelsenatorial" style={carStyles}
                                className={`btn btn-outline-dark border border-dark ${!stados.senatorial || votos?.votoSenatorial > -1 ? "disabled" : ""}`}>
                                <img src={S} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Senatorial</h3>
                        </div>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelPresidencial" style={carStyles}
                                className={`btn btn-outline-dark border border-dark ${!stados.presidencial || votos?.votoPresidencial > -1 ? "disabled" : ""}`}>
                                <img src={P} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Presidencial</h3>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default IndexVotacion;
