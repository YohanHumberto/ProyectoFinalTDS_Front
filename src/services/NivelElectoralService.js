import BaseService from './BaseService';

class NivelElectoralService extends BaseService {
  constructor() {
    let _baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/NivelesElectorales';
    super(_baseUrl);
    this.baseUrl = _baseUrl;
  }

  async obtenerPorId(id) {
    const token = window.localStorage.getItem('tokenAdmin');
    //console.log('Token GET (NivelElectoralService):', token);
    const res = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }
}

export default NivelElectoralService;
