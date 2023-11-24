import BaseService from './BaseService';

class EleccionesService extends BaseService {
  constructor() {
    let _baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/Elecciones';
    super(_baseUrl);
    this.baseUrl = _baseUrl;
  }

  async obtenerPorFecha(fecha) {
    const res = await fetch(this.baseUrl + '/' + fecha);
    return res.json();
  }

  async asignarCandidatura(candidatura) {
    const res = await fetch(this.baseUrl + '/agregar-candidatura', {
      method: 'POST',
      body: JSON.stringify(candidatura),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }

  async obtenerPorId(id) {
    const res = await fetch(this.baseUrl + '/' + id);
    return res.json();
  }
}

export default EleccionesService;
