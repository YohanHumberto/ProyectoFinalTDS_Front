class CargosElectoralesService {
    constructor() {
        this.baseUrl = "https://www.automatizacionelectoral.somee.com/api/CargosElectorales";
    }

    async obtener() {
        const res = await fetch(this.baseUrl);
        return res.json();
    }

    async obtenerPorId(id) {
        const res = await fetch(this.baseUrl + "/" + id);
        return res.json();
    }
    
}

export default CargosElectoralesService;