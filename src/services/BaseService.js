class BaseService {

    constructor(_baseUrl) {
        this.baseUrl = _baseUrl;
    }

    async obtener(searchString) {
        const token = window.localStorage.getItem("token");
        console.log("Token GET:", token);
        const res = await fetch(this.baseUrl + `?search=${searchString}`, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

    async agregar(entity) {
        const token = window.localStorage.getItem("token");
        console.log("Token POST:", token);
        const res = await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
        return res.json();
    }

    async editar(entity) {
        const token = window.localStorage.getItem("token");
        console.log("Token PUT:", token);
        const res = await fetch(`${this.baseUrl}/${entity.id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
        return res.json();
    }

    async eliminar(id) {
        const token = window.localStorage.getItem("token");
        console.log("Token PUT:", token);
        const res = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        });
        return res;
    }

}

export default BaseService;