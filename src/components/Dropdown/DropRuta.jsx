import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DropRuta() {
    return (
        <NavDropdown title="Rutas">
            <NavDropdown.Item as={Link} to="/clientes">
                Clientes
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/sedes"}>
                Sedes
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/ciudades"}>
                Ciudades
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/celulares"}>
                Celulares
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/personas"}>
                Personas
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/rutas"}>
                Rutas
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/viajes"}>
                Viajes
            </NavDropdown.Item>
        </NavDropdown>
    )
}