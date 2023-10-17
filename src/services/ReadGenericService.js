class PartidoService {
    constructor() {
        this.baseUrl = "https://www.automatizacionelectoral.somee.com/api/CargosElectorales";
    }

    async obtener() {
        const res = await fetch(this.baseUrl);
        return res.json();
    }

    async obtenerPorSiglas(siglas) {
        const res = await fetch(this.baseUrl + "/" + siglas);
        return res.json();
    }

}

export default PartidoService;