
const NivelPresidencialCard = ({ item }) => {

    let carStyle = {
        width: "350px",
        height: "230PX  ",
    }
    let logoimg = {
        width: "30px",
        height: "30px !important",
        backgroundImage: "url('https://i1.wp.com/www.decirloahora.com/wp-content/uploads/2020/08/prm-logo-hd-2-1024x1024-1.png?resize=696%2C696&ssl=1')",
        backgroundSize: "cover", /* Ajusta la imagen para cubrir todo el div */
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain"
    }

    let candidatoImg = {
        width: "30px",
        height: "30px !important",
        backgroundImage: "url('https://th.bing.com/th/id/OIP.js4HZVodpqO3GAQjIVOSzAHaGP?pid=ImgDet&rs=1')",
        backgroundSize: "cover", /* Ajusta la imagen para cubrir todo el div */
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }

    let pStyle = {
        fontSize: "10px",
        marginBottom: "0px",
        fontWeight: "bold"
    }

    return (
        <>
            <div style={carStyle} className="card my-3">
                <div className="card-header row m-0 p-2">
                    <div className='col-3 w-100 h-100' style={{ ...logoimg, backgroundImage: `url('${item?.candidato.partido?.logoUrl}')`, }}></div>
                    <div className='col-9 pr-2'>
                        <h5>{item?.candidato.partido?.nombre?.toUpperCase()}</h5>
                        <h5>{item?.candidato.partido?.siglas?.toUpperCase()}</h5>
                    </div>
                </div>
                <div className="card-body row m-0 p-2">
                    <div className='col-5 w-100 h-100' style={{ ...candidatoImg, backgroundImage: `url('${item?.candidato.fotoUrl}')` }}></div>
                    <div className='col-7 pr-2'>
                        <p style={pStyle}>PARA PRESIDENTE:</p>
                        <h5>{item?.candidato.nombre?.toUpperCase()}</h5>
                        <p style={pStyle}>PARA VICEPRESIDENTE:</p>
                        <h5>R{item?.candidato.nombre?.toUpperCase()}</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NivelPresidencialCard;
