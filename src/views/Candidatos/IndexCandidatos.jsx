import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
  Table,
  Container,
  Row,
} from 'reactstrap';
// core components
import Header from '../../components/Headers/Header.js';
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';
import CreateCandidato from './CreateCandidato.jsx';
import EditCandidato from './EditCandidato.jsx';
import Loader from '../../components/Loaders/Loader.jsx';

const IndexCandidatos = () => {
  const {
    loading,
    candidatos,
    cargarCandidatos,
    agregarCandidato,
    editarCandidato,
    eliminarCandidato,
  } = useContext(DataContext);
  const [editModal, setEditModal] = useState({ state: false, id: 0 });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
  };

  const HandleClickDelete = (id) => {
    eliminarCandidato(id);
  };

  useEffect(() => {
    cargarCandidatos();
  }, [currentPage, itemsPerPage]);

  const Search = (searchString) => {
    cargarCandidatos(searchString);
  };

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col mb-2">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h2 className="mb-0">Candidatos</h2>
                <div className="d-flex">
                  <input
                    className="form-control me-2 mr-2"
                    type="search"
                    onChange={(e) => Search(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <CreateCandidato />
                </div>
                <EditCandidato
                  stateprop={editModal.state}
                  id={editModal.id}
                  setEditModal={setEditModal}
                />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cargo Electoral</th>
                    <th scope="col">Partido</th>
                    <th scope="col">Cedula</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {candidatos
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item) => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img alt="..." src={item.fotoUrl} />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">{item.id}</span>
                              </Media>
                            </Media>
                          </th>
                          <td>
                            {item.nombre}
                            {item.apellido}
                          </td>
                          <td>{item.cargoElectoral.nombre}</td>
                          <td>{item.partido.nombre}</td>
                          <td>{item.cedula}</td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  className="text-warning"
                                  href="#pablo"
                                  onClick={() =>
                                    setEditModal({
                                      id: item.id,
                                      state: !editModal.state,
                                    })
                                  }
                                >
                                  Editar
                                </DropdownItem>
                                <DropdownItem
                                  className="text-danger"
                                  href="#pablo"
                                  onClick={(e) => HandleClickDelete(item.id)}
                                >
                                  Eliminar
                                </DropdownItem>
                                <DropdownItem
                                  className="text-info"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Detalle
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
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
                            onClick={() => handlePageChange(currentPage - 1)}
                            previous
                          />
                        </PaginationItem>
                      )}
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>
                      {currentPage !==
                        Math.ceil(
                          Array.from(candidatos).length / itemsPerPage
                        ) && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(currentPage + 1)}
                            next
                          />
                        </PaginationItem>
                      )}
                    </Pagination>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default IndexCandidatos;
