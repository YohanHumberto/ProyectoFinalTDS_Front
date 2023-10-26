import {
    Badge,
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
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect, useState } from "react";
import CreateCandidatura from "./CreateCandidatura.jsx";
import EditCandidatura from "./EditCandidatura.jsx";
import Loader from "../../components/Loaders/Loader.jsx";

const IndexCandidatura = () => {

    const { loading, candidaturas, cargarCandidaturas, eliminarCandidatura } = useContext(DataContext);
    const [editModal, setEditModal] = useState({ state: false, id: 0 });

    const HandleClickDelete = (id) => {
        eliminarCandidatura(id);
    }

    useEffect(() => {
        cargarCandidaturas();
    }, []);

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
                                <CreateCandidatura />
                                <EditCandidatura stateprop={editModal.state} id={editModal.id} setEditModal={setEditModal} />
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">NivelElectoral</th>
                                        <th scope="col">Candidato</th>
                                        <th scope="col">Vice candidato</th>
                                        {/* <th scope="col">Users</th> */}
                                        {/* <th scope="col">Completion</th>  */}
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        candidaturas.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <th>
                                                        {item.id}
                                                    </th>
                                                    <th scope="row">
                                                        {item.nivelElectoral.nombre}
                                                    </th>
                                                    <td>{item.candidato?.nombre + item.candidato?.apellido}</td>
                                                    <td>{item.viceCandidato?.nombre + item.viceCandidato?.apellido}</td>
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

export default IndexCandidatura;