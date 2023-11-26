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

}

export default VotoService;
