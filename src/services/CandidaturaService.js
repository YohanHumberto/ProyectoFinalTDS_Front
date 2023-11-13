import BaseService from "./BaseService";

class CandidaturaService extends BaseService {

    constructor() {
        let _baseUrl = "https://www.automatizacionelectoral.somee.com/api/Candidaturas";
        super(_baseUrl);
        this.baseUrl = _baseUrl;
    }

    async obtenerPorNivelElectoral(nivelElectoral) {
        const res = await fetch(this.baseUrl + `/nivel-electoral/${nivelElectoral}`);
        return res.json();
    }
}

export default CandidaturaService;