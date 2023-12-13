import { useContext, useEffect, useState } from 'react';
import NivelPresidencialCard from '../../components/Cards/NivelPresidencialCard';
import { DataContext } from '../../context/GlobalContext';
import NivelSenatorialCard from '../../components/Cards/NivelSenatorialCard';
import NivelMunicipalCard from '../../components/Cards/NivelMunicipalCard';
import NivelDiputacionCard from '../../components/Cards/NivelDiputacionCard';
import VotacionNavbar from '../../components/Navbars/VotacionNavbar';
import M from '../../assets/img/M.svg'
import D from '../../assets/img/D.svg'
import S from '../../assets/img/S.svg'
import P from '../../assets/img/P.svg'
import { useNavigate } from 'react-router-dom';



let nivelObj = {
    "Presidencial": {
        title: "NIVEL PRESIDENCIAL",
        icon: P
    },
    "Senatorial": {
        title: "NIVEL SENATORIAL",
        icon: S
    },
    "Diputación": {
        title: "NIVEL DE DIPUTACION",
        icon: D
    },
    "Municipal": {
        title: "NIVEL MUNICIPAL",
        icon: M
    },
}

let row = {
    justifyContent: "space-evenly"
}

const NivelesElectorales = ({ nivel }) => {

    const { obtenerEleccionesPorFecha } = useContext(DataContext);
    const [candidaturas, setCandidaturas] = useState([]);
    const [eleccion, setEleccion] = useState([]);
    const navigation = useNavigate();

    let render = {
        NivelPresidencialCard: candidaturas.length > 0 && nivel === "Presidencial",
        NivelSenatorialCard: candidaturas.length > 0 && nivel === "Senatorial",
        NivelDiputacionCard: candidaturas.length > 0 && nivel === "Diputación",
        NivelMunicipalCard: candidaturas.length > 0 && nivel === "Municipal",
    }

    async function getCandidaturasPorNivel() {
        let data = await obtenerEleccionesPorFecha("2023-11-15T00:00:00");
        console.log(data)
        setEleccion(data);
        let provincia = JSON.parse(localStorage.getItem("ciudadano"))?.provincia;
        return data.candidaturas.filter(x => x.nivelElectoral.nombre == nivel).filter(x => x.provincia == provincia || nivel == "Presidencial");
    }

    let GetCandidaturaPorNivelElectoral = async () => {
        let data = await getCandidaturasPorNivel();
        // console.log(data);

        if (nivel === "Diputación") {
            let ordenado = [];
            data.forEach((item, index) => {
                let Index = ordenado.findIndex(x => x.idpartido == item.candidato.partido.id);
                if (Index == -1) {
                    ordenado.push({
                        idpartido: item.candidato.partido.id,
                        candidaturas: [item]
                    });
                } else {
                    ordenado[Index].candidaturas.push(item);
                }
            });
            setCandidaturas(ordenado);
            console.log(ordenado)
        } else if (nivel === "Municipal") {
            let ordenado = [];
            data.forEach((item, index) => {
                let Index = ordenado.findIndex(x => x.idpartido == item.candidato.partido.id);
                if (Index == -1) {
                    ordenado.push({
                        idpartido: item.candidato.partido.id,
                        candidaturas: [item]
                    });
                } else {
                    ordenado[Index].candidaturas.push(item);
                }
            });

            setCandidaturas(ordenado);
            console.log(ordenado)
        } else {
            console.log(data);
            setCandidaturas(data);
        }
    }

    useEffect(() => {
        GetCandidaturaPorNivelElectoral();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        for (let index = 0; index < e.target.length; index++) {
            if (e.target[index].checked) {
                let obj = JSON.parse(window.localStorage.getItem("votos")) ?? {
                    "votoMunicipal": -1,
                    "votoMunicipalRegidor": -1,
                    "votoSenatorial": -1,
                    "votoPresidencial": -1,
                    "votoDiputacion": -1,
                };
                let pocision = e.target[index].name;
                obj[pocision] = parseInt(e.target[index].value);
                window.localStorage.setItem("votos", JSON.stringify(obj))
                navigation("/votacion/votaciones");
            }
        }
    }

    return (
        <>
            <VotacionNavbar title={nivelObj[nivel].title} icon={nivelObj[nivel].icon} periodo={eleccion?.periodo} fecha={eleccion?.fecha} />

            <form style={{ minHeight: "81vh", background: "#c7c8ca", fontSize: "14px" }} onSubmit={handleSubmit}>
                <div className='p-2 d-flex justify-content-end'>
                    <button className='btn' style={{ background: "#c18e3f" }}>CONTINUAR</button>
                </div>
                <div className="row m-0 p-2 m-auto pt-5" style={row}>
                    {render.NivelPresidencialCard && candidaturas.map(item => <NivelPresidencialCard key={item.id} item={item} />)}
                    {render.NivelSenatorialCard && candidaturas.map(item => <NivelSenatorialCard key={item.id} item={item} />)}
                    {render.NivelDiputacionCard && candidaturas.map(item => <NivelDiputacionCard key={item.id} item={item} />)}
                    {render.NivelMunicipalCard && candidaturas.map(item => <NivelMunicipalCard key={item.idpartido} item={item} />)}
                </div>
            </form>
        </>
    );
};

export default NivelesElectorales;
