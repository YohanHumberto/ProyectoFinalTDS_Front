import BaseService from "./BaseService";

class CandidatoService extends BaseService {

    constructor() {
        let _baseUrl = "https://www.automatizacionelectoral.somee.com/api/Candidatos";
        super(_baseUrl);
        this.baseUrl = _baseUrl;
    }

    async obtenerPorSiglas(siglas) {
        const res = await fetch(this.baseUrl + "/" + siglas);
        return res.json();
    }

}

export default CandidatoService;