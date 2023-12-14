class VotoService {
    constructor() {
        this.baseUrl = 'https://www.automatizacionelectoral.somee.com/api/votos';
    }

    async voto(votos) {
        const token = window.localStorage.getItem("token");
        const res = await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(votos),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
        });
        return res.json();
    }

    async validarVotoExistente(datos, token) {
        const res = await fetch(this.baseUrl + "/validar-votos-existente", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        });
        return await res.json();
    }

}

export default VotoService;
