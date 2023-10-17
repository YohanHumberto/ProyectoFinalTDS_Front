class PartidoService {
    constructor() {
        this.baseUrl = "https://www.automatizacionelectoral.somee.com/api/Partidos";
    }

    async obtener() {
        const res = await fetch(this.baseUrl);
        return res.json();
    }

    async obtenerPorSiglas(siglas) {
        const res = await fetch(this.baseUrl + "/" + siglas);
        return res.json();
    }

    async agregar(entity) {
        const res = await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

    async editar(entity) {
        const res = await fetch(`${this.baseUrl}/${entity.id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

    async eliminar(id) {
        const res = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res;
    }

}

export default PartidoService;