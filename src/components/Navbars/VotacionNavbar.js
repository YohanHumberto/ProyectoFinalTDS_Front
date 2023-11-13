import { Link } from "react-router-dom";
import { Navbar } from "reactstrap";

import JceConNombre from '../../assets/img/JceConNombre.png'
import JceSinNombre from '../../assets/img/JceSinNombre.png'
import rdEscudo from '../../assets/img/rdEscudo.png'

let colors = ["#493833", "#c7c8ca", "#c18e3f"]

function convertirFormato(fechaString) {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaString);

    // Obtener el nombre del mes y el día del mes
    const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fecha);
    const dia = fecha.getDate();

    // Obtener el año
    const anio = fecha.getFullYear();

    // Crear la cadena formateada
    const fechaFormateada = `${dia} DE ${nombreMes.toUpperCase()} DEL ${anio}`;

    return fechaFormateada;
}


const VotacionNavbar = ({ title, icon, periodo, fecha }) => {

    let carStyles = {
        width: "130px",
        height: "130px",
        background: "#c18e3f",
        borderRadius: "65px",
        // paddingLeft: "16px",
        textAlign: "center",
        display: "flex",
        flexDirection: "Column",
        justifyContent: "center",
    };

    let carStylesp = {
        width: "130px",
        height: "130px",
        // padding: "10px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    };

    let col = {
        display: "flex",
        justifyContent: "end",
    }

    return (
        <>
            <Navbar className="navbar navbar-dark" expand="md" style={{ height: "140px", background: "#c7c8ca", borderBottom: "2px solid #493833", overflow: "hidden" }}>
                <div className="col-lg-4" style={{ fontWeight: "bold" }}>
                    <p style={{ marginBottom: "0px", fontWeight: "bold", color: "#c18e3f", fontSize: "24px" }}>{title}</p>
                    <p style={{ marginBottom: "0px", fontWeight: "bold", color: "#c18e3f" }}>PERIODO {periodo}</p>
                    <p style={{ marginBottom: "0px", fontWeight: "bold", color: "#493833" }}>{fecha && convertirFormato(fecha)}</p>
                </div>
                <div className="col-lg-4 row">
                    <div className="col-6" style={{ textAlign: "center" }}>
                        <img width={80} height={80} src={rdEscudo} /><br />
                        <p style={{ fontSize: "12px", marginBottom: "0px", color: "#493833" }}> Republica dominicana</p>
                        <p style={{ marginBottom: "0px", fontWeight: "bold", color: "#493833" }}>Junta Central Electoral</p>
                    </div>
                    <div className="col-6">
                        <img width={120} height={120} src={JceSinNombre} />
                    </div>
                </div>
                <div className="col-lg-4 row">
                    <div className="py-3" style={{marginLeft: "-80px"}}>
                        <h4>PROVINCIA: <b>{"Santo domingo"}</b></h4><br/>
                        <h4>CIRCUNSCRIPCION: <b>{"001"}</b></h4>
                    </div>
                    {
                        icon != null && (
                            <div style={col} className="text-center">
                                <div style={carStylesp}>
                                    <Link to="/votacion/nivelMunicipal" style={carStyles} className='btn btn-outline-dark border border-dark'>
                                        <img src={icon} />
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </Navbar>
        </>
    );
};

export default VotacionNavbar;
