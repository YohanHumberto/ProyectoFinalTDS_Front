import BaseService from './BaseService';

class ProvinciasService extends BaseService {
  constructor() {
    let _baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/Provincias';
    super(_baseUrl);
    this.baseUrl = _baseUrl;
  }

  async obtenerPorId(id) {
    const token = window.localStorage.getItem('token');
    //console.log('Token GET (ProvinciasService):', token);
    const res = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }
}

export default ProvinciasService;
