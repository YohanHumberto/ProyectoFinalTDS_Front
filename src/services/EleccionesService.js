class EleccionesService {

    constructor() {
        this.baseUrl = "https://www.automatizacionelectoral.somee.com/api/Elecciones";
    }

    async obtener() {
        const res = await fetch(this.baseUrl);
        return res.json();
    }

    async obtenerPorFecha(fecha) {
        const res = await fetch(this.baseUrl + "/" + fecha);
        return res.json();
    }

    async agregar(eleccion) {
        const res = await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(eleccion),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

    async asignarCandidatura(candidatura) {
        const res = await fetch(this.baseUrl + "/agregar-candidatura", {
            method: "POST",
            body: JSON.stringify(candidatura),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }


}

export default EleccionesService;