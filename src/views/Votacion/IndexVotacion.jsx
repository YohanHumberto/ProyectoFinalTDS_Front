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


    let getELeccion = async () => {
        let data = await obtenerEleccionesPorFecha("2024-05-16T00:00:00");
        setEleccion(data);
    }

    useEffect(() => {
        getELeccion();
    }, []);

    return (
        <>
            <VotacionNavbar title={"NIVELES ELECTORALES"} periodo={eleccion?.periodo} fecha={eleccion?.fecha} />
            <div style={{ minHeight: "81vh", background: "#c7c8ca" }}>
                <div className="row m-0 p-2 m-auto pt-5" style={{ justifyContent: "center", gap: "1rem" }}>

                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelMunicipal" style={carStyles} className='btn btn-outline-dark border border-dark'>
                                <img src={M} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Municipal</h3>
                        </div>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelDiputacion" style={carStyles} className='btn btn-outline-dark border border-dark'>
                                <img src={D} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Diputacion</h3>
                        </div>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelsenatorial" style={carStyles} className='btn btn-outline-dark border border-dark'>
                                <img src={S} />
                            </Link>
                            <h3 style={{ "fontSize": "25px" }}>Senatorial</h3>
                        </div>
                    </div>
                    <div style={col} className="text-center">
                        <div style={carStylesp}>
                            <Link to="/votacion/nivelPresidencial" style={carStyles} className='btn btn-outline-dark border border-dark'>
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
