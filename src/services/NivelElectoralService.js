import BaseService from './BaseService';

class NivelElectoralService extends BaseService {
  constructor() {
    let _baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/NivelesElectorales';
    super(_baseUrl);
    this.baseUrl = _baseUrl;
  }

  async obtenerPorId(id) {
    const res = await fetch(this.baseUrl + '/' + id);
    return res.json();
  }
}

export default NivelElectoralService;
