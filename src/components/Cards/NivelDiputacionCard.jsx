import { useEffect } from "react";

const NivelDiputacionCard = ({ item }) => {

    let { candidaturas } = item;

    useEffect(() => {
        const ciudadano = JSON.parse(localStorage.getItem("ciudadano"));
        ciudadano.circunscripcion = candidaturas?.circunscripcion;
        localStorage.setItem("ciudadano", JSON.stringify(ciudadano));
    }, []);

    let carStyle = {
        width: "260px",
    }

    let logoimg = {
        width: "30px",
        height: "30px !important",
        backgroundImage: "url('https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain"
    }

    let candidatoImg = {
        margin: "auto",
        width: "100px",
        height: "100px !important",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    let pStyle = {
        fontSize: "10px",
        marginBottom: "0px",
        fontWeight: "bold"
    }

    let center = {
        textAlign: "center",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center"
    }

    return (
        <>
            <label htmlFor={`check${item.id}`}>
                <div style={carStyle} className="card my-3" key={item?.id}>
                    <div className="card-header row m-0 p-2">
                        <div className='col-3 w-100 h-100' style={{ ...logoimg, backgroundImage: `url('${item?.candidato.partido?.logoUrl}')`, }}></div>
                        <div className='col-7 pr-2'>
                            <h6>{item?.candidato.partido?.nombre.toUpperCase()}</h6>
                            <h6><b>{item?.candidato.partido?.siglas.toUpperCase()}</b></h6>
                        </div>
                        <div className="col-2 p-0">
                            <input id={`check${item.id}`} type="radio" value={item.id} name="votoDiputacion" style={{ width: "30px", height: "30px" }} />
                        </div>
                    </div>
                    <div className="card-body row m-0 p-2">
                        <div className="col-12" style={center}>
                            <p style={pStyle}>PARA DIPUTADO/A:</p>
                            <img style={{ ...candidatoImg }} src={item?.candidato.fotoUrl} />
                        </div>
                        <div className='col-12 pr-2 pt-2 text-center'>
                            <h6><b>{item?.candidato.nombre?.toUpperCase()} {item?.candidato.nombre?.toUpperCase()}</b></h6>
                        </div>
                    </div>
                </div>
            </label>
        </>
        // <>
        //     <div style={carStyle} className="card my-3" key={item?.id}>
        //         <div className="card-header row m-0 p-2">
        //             <div className='col-3 w-100 h-100' style={{ ...logoimg, backgroundImage: `url('${candidaturas[0].candidato.partido?.logoUrl}')`, }}></div>
        //             <div className='col-8 pr-2'>
        //                 <h6><b>{candidaturas[0].candidato.partido?.nombre?.toUpperCase()}</b></h6>
        //                 <h6><b>{candidaturas[0].candidato.partido?.siglas?.toUpperCase()}</b></h6>
        //             </div>
        //         </div>
        //         <div className="card-body row m-0 p-2">
        //             <div className="col-12" style={center}>
        //                 <p style={pStyle}>PARA DIPUTADO/A:</p>
        //             </div>

        //             {candidaturas.map(item => {
        //                 return (
        //                     <div className="col-4 p-2">
        //                         <label htmlFor={`check${item.id}`}>
        //                             <div style={{ ...candidatoImg, backgroundImage: `url('${item?.candidato.fotoUrl}')` }}></div>
        //                             <h6 className="mt-2">
        //                                 <input id={`check${item.id}`} type="radio" value={item.id} name="votoDiputacion" style={{ width: "20px", height: "20px", width: "13px", height: "13px", marginRight: "5px" }} />
        //                                 <b>{item?.candidato.nombre?.toUpperCase()} {item?.candidato.apellido?.toUpperCase()}</b>
        //                             </h6>
        //                         </label>
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //     </div>
        // </>
    );
};

export default NivelDiputacionCard;
