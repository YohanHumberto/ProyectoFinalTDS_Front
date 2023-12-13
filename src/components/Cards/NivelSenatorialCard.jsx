const NivelSenatorialCard = ({ item }) => {

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
        // backgroundImage: "url('https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1')",
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
                            <input id={`check${item.id}`} type="radio"  value={item.id} name="votoSenatorial" style={{ width: "30px", height: "30px" }} />
                        </div>
                    </div>
                    <div className="card-body row m-0 p-2">
                        <div className="col-12" style={center}>
                            <p style={pStyle}>PARA SENADOR/A:</p>
                            <img style={{ ...candidatoImg }} src={item?.candidato.fotoUrl} />
                        </div>
                        <div className='col-12 pr-2 pt-2 text-center'>
                            <h6><b>{item?.candidato.nombre?.toUpperCase()} {item?.candidato.nombre?.toUpperCase()}</b></h6>
                        </div>
                    </div>
                </div>
            </label>
        </>
    );
};

export default NivelSenatorialCard;
