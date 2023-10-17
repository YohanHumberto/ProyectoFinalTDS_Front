class AuthService {

    constructor() {
        this.baseUrl = "https://www.automatizacionelectoral.somee.com/api/Auth";
    }

    async login(user) {
        const res = await fetch(this.baseUrl + "/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }

    async login(changepasswork) {
        const res = await fetch(this.baseUrl + "/change-password", {
            method: "PUT",
            body: JSON.stringify(changepasswork),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }
}