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
import AsignarCandidatura from './AsignarCandidtura.jsx';
import Loader from '../../components/Loaders/Loader.jsx';
import '../../assets/img/brand/error-icon.png';
import CreateEleccion from './CreateElecciones';
const IndexElecciones = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editModal, setEditModal] = useState({ state: false, id: 0 });

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
  };

  const {
    loading,
    elecciones,
    cargarElecciones,
    agregarEleccion,
    asignarCandidatura,
  } = useContext(DataContext);

  useEffect(() => {
    cargarElecciones();
  }, [currentPage, itemsPerPage]);

  const Search = (searchString) => {
    cargarElecciones(searchString);
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
                <h2 className="mb-0">Lista de elecciones</h2>
                <div className="d-flex">
                  <input
                    className="form-control me-2 mr-2"
                    type="search"
                    onChange={(e) => Search(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <CreateEleccion />
                </div>
                <AsignarCandidatura
                  stateprop={editModal.state}
                  id={editModal.id}
                  setEditModal={setEditModal}
                />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {elecciones
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item) => {
                      return (
                        <tr key={item.id}>
                          <th>{item.id}</th>
                          <th scope="row">
                            {new Date(item.fecha).getFullYear() +
                              '-' +
                              (new Date(item.fecha).getMonth() + 1)
                                .toString()
                                .padStart(2, '0') +
                              '-' +
                              new Date(item.fecha)
                                .getDate()
                                .toString()
                                .padStart(2, '0')}
                          </th>
                          <th>{item.periodo}</th>
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
                                  className="text-info"
                                  href="#pablo"
                                  onClick={() => {
                                    setEditModal({
                                      id: item.id,
                                      state: !editModal.state,
                                    });
                                  }}
                                >
                                  Asignar candidatura
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
                          Array.from(elecciones).length / itemsPerPage
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
                          Array.from(elecciones).length / itemsPerPage
                        ) && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(Math.ceil(
                              Array.from(elecciones).length / itemsPerPage
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

export default IndexElecciones;
