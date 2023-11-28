import BaseService from "./BaseService";

class CandidatoService extends BaseService {

    constructor() {
        let _baseUrl = "https://www.automatizacionelectoral.somee.com/api/Candidatos";
        super(_baseUrl);
        this.baseUrl = _baseUrl;
    }

    async obtenerPorSiglas(siglas) {
        const token = window.localStorage.getItem("token");
        //console.log("Token GET (CandidatoService):", token);
        const res = await fetch(`${this.baseUrl}/${siglas}`, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

}

export default CandidatoService;