import {
  Badge,
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
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import Header from '../../components/Headers/Header.js';
import { DataContext } from '../../context/GlobalContext.js';
import { useContext, useEffect, useState } from 'react';
import Create from './Create.jsx';
import Edit from './Edit.jsx';
import Loader from '../../components/Loaders/Loader.jsx';

const IndexPartido = () => {
  const { loading, partidos, cargarPartidos, eliminarPartido } =
    useContext(DataContext);
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
    eliminarPartido(id);
  };

  const Search = (searchString) => {
    cargarPartidos(searchString);
    setCurrentPage(1);
  };

  useEffect(() => {
    cargarPartidos();
  }, [currentPage, itemsPerPage]);

  return (
    <>
      {loading == true && <Loader />}
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col mb-2">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h2 className="mb-0">Lista de partidos</h2>
                <div className="d-flex">
                  <input
                    className="form-control me-2 mr-2"
                    type="search"
                    onChange={(e) => Search(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <Create />
                </div>
                <Edit
                  stateprop={editModal.state}
                  id={editModal.id}
                  setEditModal={setEditModal}
                />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Siglas</th>
                    {/* <th scope="col">Status</th> */}
                    {/* <th scope="col">Users</th> */}
                    {/* <th scope="col">Completion</th>  */}
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {partidos
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
                                <img alt="..." src={item.logoUrl} />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {item.nombre}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{item.siglas}</td>
                          {/* <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {item.id}
                            </Badge>
                          </td> */}
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
                          Array.from(partidos).length / itemsPerPage
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
                          Array.from(partidos).length / itemsPerPage
                        ) && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(Math.ceil(
                              Array.from(partidos).length / itemsPerPage
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

export default IndexPartido;
