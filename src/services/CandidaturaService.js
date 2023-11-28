import BaseService from "./BaseService";

class CandidaturaService extends BaseService {

    constructor() {
        let _baseUrl = "https://www.automatizacionelectoral.somee.com/api/Candidaturas";
        super(_baseUrl);
        this.baseUrl = _baseUrl;
    }

    async obtenerPorNivelElectoral(nivelElectoral) {
        const token = window.localStorage.getItem("tokenAdmin");
        //console.log("Token GET (CandidaturaService):", token);
        const res = await fetch(`${this.baseUrl}/nivel-electoral/${nivelElectoral}`, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }
}

export default CandidaturaService;