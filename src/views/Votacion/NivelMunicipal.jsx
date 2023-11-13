import NivelMunicipalCard from "../../components/Cards/NivelMunicipalCard";

const NivelMunicipal = () => {

    let row = {
        justifyContent: "space-evenly"
    }

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let data = [
        {
            "id": 1,
            "cedula": "72867560119",
            "nombre": "Luis",
            "apellido": "Abinadel",
            "fotoUrl": "https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1",
            "cargoElectoral": {
                "id": 1,
                "nombre": "Presidente"
            },
            "partido": {
                "id": 1,
                "nombre": "Partido Revolucionario Moderno",
                "siglas": "PRM",
                "logoUrl": "https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1",
                "candidatos": [
                    null
                ]
            }
        },
        {
            "id": 6,
            "cedula": "92494286349",
            "nombre": "Mario",
            "apellido": "Carvajar",
            "fotoUrl": "https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1",
            "cargoElectoral": {
                "id": 4,
                "nombre": "Diputado"
            },
            "partido": {
                "id": 1,
                "nombre": "Partido Revolucionario Moderno",
                "siglas": "PRM",
                "logoUrl": "https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1",
                "candidatos": [
                    null
                ]
            }
        },
        {
            "id": 4,
            "cedula": "40843465583",
            "nombre": "Frank",
            "apellido": "Mendez",
            "fotoUrl": "https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1",
            "cargoElectoral": {
                "id": 4,
                "nombre": "Diputado"
            },
            "partido": {
                "id": 1,
                "nombre": "Partido Revolucionario Moderno",
                "siglas": "PRM",
                "logoUrl": "https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1",
                "candidatos": [
                    null
                ]
            }
        },
        {
            "id": 2,
            "cedula": "86552783667",
            "nombre": "Raquel",
            "apellido": "Peña",
            "fotoUrl": "https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1",
            "cargoElectoral": {
                "id": 2,
                "nombre": "Vice Presidente"
            },
            "partido": {
                "id": 1,
                "nombre": "Partido Revolucionario Moderno",
                "siglas": "PRM",
                "logoUrl": "https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1",
                "candidatos": [
                    null
                ]
            }
        },
        {
            "id": 3,
            "cedula": "11606592766",
            "nombre": "Faride",
            "apellido": "Raful",
            "fotoUrl": "https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1",
            "cargoElectoral": {
                "id": 3,
                "nombre": "Senador"
            },
            "partido": {
                "id": 1,
                "nombre": "Partido Revolucionario Moderno",
                "siglas": "PRM",
                "logoUrl": "https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1",
                "candidatos": [
                    null
                ]
            }
        },
        {
            "id": 5,
            "cedula": "55470464984",
            "nombre": "Pedro",
            "apellido": "Rivas",
            "fotoUrl": "https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1",
            "cargoElectoral": {
                "id": 6,
                "nombre": "Vice Alcalde"
            },
            "partido": {
                "id": 1,
                "nombre": "Partido Revolucionario Moderno",
                "siglas": "PRM",
                "logoUrl": "https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1",
                "candidatos": [
                    null
                ]
            }
        }
    ];

    return (
        <>
            <div style={{ minHeight: "81vh", background: "#c7c8ca", fontSize: "14px" }}>
                <div className="row m-0 p-2 m-auto pt-5" style={row}>
                    {data.map(item => <NivelMunicipalCard  key={item.id} item={item} />)}
                </div>
            </div>
        </>
    );
};

export default NivelMunicipal;
