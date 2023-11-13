const NivelMunicipalCard = ({ item }) => {

    let carStyle = {
        width: "430px",
        height: "auto",
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
        width: "80px",
        height: "80px !important",
        backgroundImage: "url('https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1')",
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
            <div style={carStyle} className="card my-3" key={item?.id}>
                <div className="card-header row m-0 p-2">
                    <div className='col-3 w-100 h-100' style={{ ...logoimg, backgroundImage: `url('${item?.candidato.partido?.logoUrl}')`, }}></div>
                    <div className='col-9 pr-2'>
                        <h5><b>{item?.candidato.partido?.nombre?.toUpperCase()}</b></h5>
                        <h5 ><b>{item?.candidato.partido?.siglas?.toUpperCase()}</b></h5>
                    </div>
                </div>
                <div className="card-body row m-0 p-2">
                    <div className="col-4 pt-5">
                        <div className="mb-2">
                            <p style={pStyle}>PARA ALCALDE/SA:</p>
                        </div>
                        <img style={{ ...candidatoImg, width: "120px", height: "120px !important", }} src={item?.candidato.fotoUrl} />

                        <div className="mt-2">
                            <h6><b>{item?.candidato.nombre?.toUpperCase()} {item?.candidato.apellido?.toUpperCase()}</b></h6>
                        </div>

                        <div className="mt-4">
                            <p style={pStyle}>PARA VICE ALCALDE/SA:</p>
                        </div>

                        <div className="mt-2">
                            <h6><b>{item?.viceCandidato.nombre?.toUpperCase()} {item?.viceCandidato.apellido?.toUpperCase()}</b></h6>
                        </div>
                    </div>
                    <div className="col-8 row m-0 p-2">
                        <div className="col-12" style={center}>
                            <p style={pStyle}>PARA REGIDOR/A:</p>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                        <div className="col-4 p-2">
                            <img style={{ ...candidatoImg }} src={item?.fotoUrl} />
                            <h6><b>{item?.nombre?.toUpperCase()} </b></h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NivelMunicipalCard;
