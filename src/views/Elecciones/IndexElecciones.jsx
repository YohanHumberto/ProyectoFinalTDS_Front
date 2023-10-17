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
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import { DataContext } from "../../context/GlobalContext.js";
import { useContext, useEffect } from "react";
import CreateEleccion from "./CreateElecciones.jsx";

const IndexElecciones = () => {

    const { elecciones, cargarElecciones, agregarEleccion, asignarCandidatura } = useContext(DataContext);

    useEffect(() => {
        cargarElecciones();
    }, []);

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col mb-2">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex justify-content-between">
                                <h2 className="mb-0">Lista de elecciones</h2>
                                <CreateEleccion />
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        elecciones.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <th>
                                                        {item.id}
                                                    </th>
                                                    <th scope="row">
                                                        {item.fecha}
                                                    </th>
                                                    <td className="text-right">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle className="btn-icon-only text-light" href="#pablo"
                                                                role="button" size="sm" color="" onClick={(e) => e.preventDefault()}   >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
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

export default IndexElecciones;