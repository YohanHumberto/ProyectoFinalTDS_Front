import BaseService from './BaseService';

class MunicipioService extends BaseService {
  constructor() {
    let _baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/Municipios';
    super(_baseUrl);
    this.baseUrl = _baseUrl;
  }

  async obtenerPorId(id) {
    const res = await fetch(this.baseUrl + '/' + id);
    return res.json();
  }
}

export default MunicipioService;
