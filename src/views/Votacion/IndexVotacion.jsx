import M from '../../assets/img/M.svg'
import D from '../../assets/img/D.svg'
import S from '../../assets/img/S.svg'
import P from '../../assets/img/P.svg'
import { Link } from 'react-router-dom';
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

    const { obtenerEleccionesPorFecha } = useContext(DataContext);
    const [eleccion, setEleccion] = useState([]);
    const [votos, setVotos] = useState({
        nivelDiputacion: -1,
        nivelSenatorial: -1,
        nivelPresidencial: -1,
        nivelMunicipal: -1
    });
    const [stados, setEstados] = useState({
        municipal: false,
        diputacion: false,
        senatorial: false,
        presidencial: false
    });


    let getELeccion = async () => {
        let data = await obtenerEleccionesPorFecha("2023-11-15T00:00:00");
        console.log(data);
        setEleccion(data);
        setEstados({
            municipal: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Municipal").length > 0,
            diputacion: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Diputacion").length > 0,
            senatorial: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Senatorial").length > 0,
            presidencial: data.candidaturas.filter(x => x.nivelElectoral.nombre == "Presidencial").length > 0
        });
    }

    useEffect(() => {
        console.log("execute stados")
        if(eleccion.length > 0){
            // let votosItem = JSON.parse(window.localStorage.getItem("votos"));
            window.localStorage.setItem("votos", JSON.stringify({
                votoDiputacion: stados.diputacion ? -1 : 0,
                votoSenatorial: stados.senatorial ? -1 : 0,
                votoPresidencial: stados.presidencial ? -1 : 0,
                votoMunicipal: stados.municipal ? -1 : 0
            }));
            setVotos(JSON.parse(window.localStorage.getItem("votos")) ?? votos);
        }
        // if (votosItem == null) {
        // }
    }, [stados]);

    useEffect(() => {
        getELeccion();
        console.log(stados)
        console.log(JSON.parse(window.localStorage.getItem("votos")))
        console.log("execute")
    }, []);

    function saveIsDesabled() {
        return (votos.votoDiputacion >= 0) && (votos.votoSenatorial >= 0)
            && (votos.votoPresidencial >= 0) && (votos.votoMunicipal >= 0)
            ? false : "disabled";
    }

    return (
        <>
            <VotacionNavbar title={"NIVELES ELECTORALES"} periodo={eleccion?.periodo} fecha={eleccion?.fecha} />
            <div style={{ minHeight: "81vh", background: "#c7c8ca" }}>
                <div className="row m-0 p-2 m-auto pt-5" style={{ justifyContent: "center", gap: "1rem" }}>
                    <div className='col-12 d-flex justify-content-end'>
                        <button className={`btn btn-warning`}
                            disabled={saveIsDesabled()}
                            style={{ background: "rgb(193, 142, 63)", borderColor: "rgb(193, 142, 63)" }}>GUARDAR</button>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelMunicipal" style={carStyles}
                                className={`btn btn-outline-dark border border-dark ${!stados.municipal || votos?.votoMunicipal > -1 ? "disabled" : ""}`}>
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
            </div>
        </>
    );
};

export default IndexVotacion;
