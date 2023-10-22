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
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect, useState } from "react";
import Create from "./Create.jsx";
import Edit from "./Edit.jsx";
import Loader from '../../components/Loaders/Loader.jsx';

const IndexPartido = () => {

  const { partidos, cargarPartidos, eliminarPartido } = useContext(DataContext);
  const [editModal, setEditModal] = useState({ state: false, id: 0 });

  const HandleClickDelete = (id) => {
    eliminarPartido(id);
  }

  useEffect(() => {
      cargarPartidos();
  }, []);

  return (
    <>
      {partidos.length < 1 && <Loader />}
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col mb-2">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h2 className="mb-0">Lista de partidos</h2>
                <Create />
                <Edit stateprop={editModal.state} id={editModal.id} setEditModal={setEditModal} />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Siglas</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Users</th> */}
                    {/* <th scope="col">Completion</th>  */}
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    partidos.map(item => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}  >
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
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {item.id}
                            </Badge>
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle className="btn-icon-only text-light" href="#pablo"
                                role="button" size="sm" color="" onClick={(e) => e.preventDefault()}   >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="text-warning" href="#pablo" onClick={() => setEditModal({ id: item.id, state: !editModal.state })}  >
                                  Editar
                                </DropdownItem>
                                <DropdownItem className="text-danger" href="#pablo" onClick={(e) => HandleClickDelete(item.id)} >
                                  Eliminar
                                </DropdownItem>
                                <DropdownItem className="text-info" href="#pablo" onClick={(e) => e.preventDefault()}  >
                                  Detalle
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default IndexPartido;