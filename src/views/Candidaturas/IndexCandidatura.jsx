import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import Header from '../../components/Headers/Header.js';
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';
import CreateCandidatura from './CreateCandidatura.jsx';
import EditCandidatura from './EditCandidatura.jsx';
import Loader from '../../components/Loaders/Loader.jsx';

const IndexCandidatura = () => {
  const { loading, candidaturas, cargarCandidaturas, eliminarCandidatura } =
    useContext(DataContext);
  const [editModal, setEditModal] = useState({ state: false, id: 0 });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const nullFieldContent = '--';

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
    eliminarCandidatura(id);
  };

  useEffect(() => {
    cargarCandidaturas();
  }, [currentPage, itemsPerPage]);

  const Search = (searchString) => {
    cargarCandidaturas(searchString);
    setCurrentPage(1);
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
                <h2 className="mb-0">Lista de candidaturas</h2>
                <div className="d-flex">
                  <input
                    className="form-control me-2 mr-2"
                    type="search"
                    onChange={(e) => Search(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <CreateCandidatura />
                </div>
                <EditCandidatura
                  stateprop={editModal.state}
                  id={editModal.id}
                  setEditModal={setEditModal}
                />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">NivelElectoral</th>
                    <th scope="col">Candidato</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Vice candidato</th>
                    <th scope="col">Cargo Vice</th>
                    <th scope="col">Provincia</th>
                    <th scope="col">Municipio</th>
                    <th scope="col">circunscripcion</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {candidaturas
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item) => {
                      return (
                        <tr key={item.id}>
                          {/* <th>{item.id}</th> */}
                          <th scope="row">{item.nivelElectoral.nombre}</th>
                          <td>
                            {item.candidato?.nombre +
                              ' ' +
                              item.candidato?.apellido}
                          </td>
                          <td>{item.candidato?.cargoElectoral.nombre}</td>
                          <td>
                            {item.viceCandidato?.nombre !== undefined
                              ? item.viceCandidato?.nombre +
                                ' ' +
                                item.viceCandidato?.apellido
                              : nullFieldContent}
                          </td>
                          <td>
                            {item.viceCandidato?.nombre !== undefined
                              ? item.viceCandidato?.cargoElectoral.nombre
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
                          Array.from(candidaturas).length / itemsPerPage
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
                          Array.from(candidaturas).length / itemsPerPage
                        ) && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(Math.ceil(
                              Array.from(candidaturas).length / itemsPerPage
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
        </Row>
      </Container>
    </>
  );
};

export default IndexCandidatura;
