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

const NivelesElectorales = ({ nivel }) => {

    let row = {
        justifyContent: "space-evenly"
    }

    const { obtenerCandidaturaPorNivelElectoral, obtenerEleccionesPorFecha } = useContext(DataContext);
    const [candidaturas, setCandidaturas] = useState([]);
    const [eleccion, setEleccion] = useState([]);

    async function getCandidaturasPorNivel() {
        let data = await obtenerEleccionesPorFecha("2024-05-16T00:00:00");
        console.log(data)
        setEleccion(data);
        return data.candidaturas.filter(x => x.nivelElectoral.nombre == nivel);
    }

    let GetCandidaturaPorNivelElectoral = async () => {
        let data = await getCandidaturasPorNivel();
        console.log(data);

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
        } else {
            console.log(data);
            setCandidaturas(data);
        }
    }

    useEffect(() => {
        GetCandidaturaPorNivelElectoral();
    }, []);


    let render = {
        NivelPresidencialCard: candidaturas.length > 0 && nivel === "Presidencial",
        NivelSenatorialCard: candidaturas.length > 0 && nivel === "Senatorial",
        NivelDiputacionCard: candidaturas.length > 0 && nivel === "Diputación",
        NivelMunicipalCard: candidaturas.length > 0 && nivel === "Municipal",
    }


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

    return (
        <>
            <VotacionNavbar title={nivelObj[nivel].title} icon={nivelObj[nivel].icon} periodo={eleccion?.periodo} fecha={eleccion?.fecha} />

            <div style={{ minHeight: "81vh", background: "#c7c8ca", fontSize: "14px" }}>
                <div className="row m-0 p-2 m-auto pt-5" style={row}>
                    {render.NivelPresidencialCard && candidaturas.map(item => <NivelPresidencialCard key={item.id} item={item} />)}
                    {render.NivelSenatorialCard && candidaturas.map(item => <NivelSenatorialCard key={item.id} item={item} />)}
                    {render.NivelDiputacionCard && candidaturas.map((item) => <NivelDiputacionCard key={item.idpartido} item={item} />)}
                    {render.NivelMunicipalCard && candidaturas.map(item => <NivelMunicipalCard key={item.id} item={item} />)}
                </div>
            </div>
        </>
    );
};

export default NivelesElectorales;
