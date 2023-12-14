import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Modal,
} from 'reactstrap';
// core components
import Header from '../../components/Headers/Header.js';
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loaders/Loader.jsx';

const ListaCandidatura = ({ stateprop, data, setListModal }) => {
  const { loading, candidaturas, cargarCandidaturas, eliminarCandidatura } =
    useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [candidatura, setCandidaturas] = useState([]);
  const [state, setState] = useState({ exampleModal: stateprop });

  const nullFieldContent = '--';

  const toggleModal = (param) => {
    setListModal({ state: !state[param], data: [] });
    setState({ [param]: !state[param] });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
  };

  useEffect(() => {
    setCandidaturas(data);
    setState({ exampleModal: stateprop });
    //cargarCandidaturas();
  }, [currentPage, itemsPerPage, stateprop]);

  return (
    <>
      <Modal
        className="modal-dialog-centered modal-fluid"
        isOpen={state.exampleModal}
        size="lg"
        toggle={() => toggleModal('exampleModal')}
      >
        {/* <Header /> */}
        {/* <Container className="mt--7" fluid> */}
        <div className="col mb-2">
          <Card className="shadow">
            <CardHeader className="border-0 d-flex justify-content-between">
              <h2 className="mb-0">Lista de candidaturas</h2>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => toggleModal('exampleModal')}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">NivelElectoral</th>
                  <th scope="col">Candidato</th>
                  <th scope="col">Vice candidato</th>
                  <th scope="col">Provincia</th>
                  <th scope="col">Municipio</th>
                  <th scope="col">circunscripcion</th>
                </tr>
              </thead>
              <tbody>
                {candidatura
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item) => {
                    return (
                      <tr key={item.id}>
                        <th>{item.id}</th>
                        <th scope="row">{item.nivelElectoral.nombre}</th>
                        <td>
                          {item.candidato?.nombre +
                            ' ' +
                            item.candidato?.apellido}
                        </td>
                        <td>
                          {item.viceCandidato?.nombre !== undefined
                            ? item.viceCandidato?.nombre +
                              ' ' +
                              item.viceCandidato?.apellido
                            : nullFieldContent}
                        </td>

                        <td>
                          {item.provincia !== undefined
                            ? item.provincia
                            : nullFieldContent}
                        </td>

                        <td>
                          {item.municipio !== undefined
                            ? item.municipio
                            : nullFieldContent}
                        </td>

                        <td>
                          {item.circunscripcion !== undefined
                            ? item.circunscripcion
                            : nullFieldContent}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {/* Pagination */}
            <CardFooter className="py-4">
              <Row className="justify-content-end">
                <Col className="mt-4">
                  Tamaño de pagina
                  <span> </span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </Col>
                <Col>
                    <Pagination
                      className="pagination justify-content-end mt-3"
                      listClassName="justify-content-end"
                    >
                       {currentPage !== 1 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(1)}
                            first
                          />
                        </PaginationItem>
                      )}
                      {currentPage !== 1 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(currentPage - 1)}
                            previous
                          />
                        </PaginationItem>
                      )}
                      <PaginationItem className="">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          className="bg-info text-white"
                        >
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage !==
                        Math.ceil(
                          Array.from(candidatura).length / itemsPerPage
                        ) && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(currentPage + 1)}
                            next
                          />
                        </PaginationItem>
                      )}
                      {currentPage !==
                        Math.ceil(
                          Array.from(candidatura).length / itemsPerPage
                        ) && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(Math.ceil(
                              Array.from(candidatura).length / itemsPerPage
                            ))}
                            last
                          />
                        </PaginationItem>
                      )}
                    </Pagination>
                  </Col>
              </Row>
            </CardFooter>
          </Card>
        </div>
        {/* </Container> */}
      </Modal>
    </>
  );
};

export default ListaCandidatura;
