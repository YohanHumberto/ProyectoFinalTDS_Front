import { useEffect, useState } from 'react';
//import Chart from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';

// core components
import {
  chartOptions,
  parseOptions,
  chartProvincias,
  chartRangoEdad,
  chartSexo,
  chartPartidos,
  chartMunicipio,
  chartCandidato,
} from '../variables/charts.js';

import Header from '../components/Headers/Header.js';
import EstadisticasService from '../services/EstadisticasService.js';

const Index = (props) => {
  const EstaServ = new EstadisticasService();
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');

  const [fProvincia, setFProvincia] = useState('');
  const [fCandidato, setFCandidato] = useState('');

  //chart variables
  const [porProvincia, setPorProvincias] = useState([
    {
      provincia: '',
      votos: 0,
    },
  ]);
  const [porMunicipio, setPorMunicipio] = useState([]);
  const [porRangoEdad, setPorRangoEdad] = useState([
    {
      rangoDeEdad: '',
      votos: 0,
    },
  ]);
  const [porSexo, setPorSexo] = useState([
    {
      sexo: '',
      votos: 0,
    },
  ]);
  const [porPartido, setPorPartido] = useState([
    {
      partido: '',
      siglas: '',
      votos: 0,
    },
  ]);
  const [porCandidato, setPorCandidato] = useState([]);

  if (window.Chart) {
    parseOptions(ChartJS, chartOptions());
  }

  useEffect(() => {
    EstaServ.votosPorPartido()
      .then((d) => setPorPartido((state) => d.data))
      .catch((e) => console.log(e));

    EstaServ.votosPorMunicipio()
      .then((d) => setPorMunicipio((state) => d.data))
      .catch((e) => console.log(e));

    EstaServ.votosPorCandidato()
      .then((d) => setPorCandidato((state) => d.data))
      .catch((e) => console.log(e));

    EstaServ.votosPorSexo()
      .then((d) => setPorSexo((state) => d.data))
      .catch((e) => console.log(e));

    EstaServ.votosPorRangoEdad()
      .then((d) => setPorRangoEdad((state) => d.data))
      .catch((e) => console.log(e));

    EstaServ.votosPorProvincia()
      .then((d) => setPorProvincias((state) => d.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    EstaServ.votosPorMunicipio(fProvincia)
      .then((d) => setPorMunicipio((state) => d.data))
      .catch((e) => console.log(e));
  }, [fProvincia]);

  useEffect(() => {
    EstaServ.votosPorCandidato(fCandidato)
      .then((d) => setPorCandidato((state) => d.data))
      .catch((e) => console.log(e));
  }, [fCandidato]);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">Votos por Provincia</h2>
                  </div>
                  <div className="col"></div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartProvincias.data(porProvincia, porProvincia)}
                    options={chartProvincias.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                  {/* <Bar options={options} data={data} /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="">
          <Col className="mt-3" xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Votaciones por rango de edad</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Doughnut
                    data={chartRangoEdad.data(porRangoEdad, porRangoEdad)}
                    options={chartRangoEdad.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mt-3" xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Votaciones por sexo</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Doughnut
                    data={chartSexo.data(porSexo, porSexo)}
                    options={chartSexo.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="mt-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Votaciones por partidos</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartPartidos.data(porPartido, porPartido)}
                    options={chartPartidos.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="mt-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Votaciones por municipio</h2>
                  </div>
                  <Col className="col" xl="3">
                    <FormGroup>
                      <Label for="exampleSearch">Search</Label>
                      <Input
                        id="exampleSearch"
                        name="search"
                        placeholder="Provincia"
                        type="search"
                        onChange={(e) => {
                          e.preventDefault();
                          const value = e.target.value;
                          setFProvincia((state) => value);
                        }}
                        value={fProvincia}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartMunicipio.data(porMunicipio, porMunicipio)}
                    options={chartMunicipio.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="mt-3">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Votaciones por Candidato</h2>
                  </div>
                  <Col className="col" xl="3">
                    <FormGroup>
                      <Label for="exampleSearch">Search</Label>
                      <Input
                        id="exampleSearch2"
                        name="search"
                        placeholder="Candidato | Partido | Nivel Electoral..."
                        type="search"
                        onChange={(e) => {
                          e.preventDefault();
                          const value = e.target.value;
                          setFCandidato((state) => value);
                        }}
                        value={fCandidato}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartCandidato.data(porCandidato, porCandidato)}
                    options={chartMunicipio.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
