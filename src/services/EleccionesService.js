import BaseService from './BaseService';

class EleccionesService extends BaseService {
  constructor() {
    let _baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/Elecciones';
    super(_baseUrl);
    this.baseUrl = _baseUrl;
  }

  async obtenerPorFecha(fecha) {
    const token = window.localStorage.getItem('token');
    //console.log('Token GET (EleccionesService):', token);
    const res = await fetch(`${this.baseUrl}/${fecha}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }

  async asignarCandidatura(candidatura) {
    const token = window.localStorage.getItem('token');
    //console.log('Token POST (EleccionesService):', token);
    const res = await fetch(`${this.baseUrl}/agregar-candidatura`, {
      method: 'POST',
      body: JSON.stringify(candidatura),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }

  async obtenerPorId(id) {
    const token = window.localStorage.getItem('token');
    //console.log('Token GET (EleccionesService):', token);
    const res = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  }
}

export default EleccionesService;
