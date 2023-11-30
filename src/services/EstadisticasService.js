class EstadisticasService {
  constructor() {
    this.baseUrl =
      'https://www.automatizacionelectoral.somee.com/api/Estadisticas';
  }

  async votosPorProvincia() {
    const token = window.localStorage.getItem('token');
    const res = await fetch(this.baseUrl + '/votos-por-provincia', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await res.json();
    return data;
  }

  async votosPorMunicipio(search = '') {
    console.log(search);
    const token = window.localStorage.getItem('token');
    const res = await fetch(
      this.baseUrl + '/votos-por-municipio?provincia=' + search,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await res.json();
    return data;
  }

  async votosPorRangoEdad() {
    const token = window.localStorage.getItem('token');
    const res = await fetch(this.baseUrl + '/votos-por-rango-de-edad', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await res.json();
    return data;
  }

  async votosPorSexo() {
    const token = window.localStorage.getItem('token');
    const res = await fetch(this.baseUrl + '/votos-por-sexo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await res.json();
    return data;
  }

  async votosPorPartido() {
    const token = window.localStorage.getItem('token');
    const res = await fetch(this.baseUrl + '/votos-por-partido', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await res.json();
    return data;
  }

  async votosPorCandidato(search = '') {
    const token = window.localStorage.getItem('token');
    const res = await fetch(
      this.baseUrl + '/votos-por-candidato?search=' + search,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await res.json();
    return data;
  }
}

export default EstadisticasService;
