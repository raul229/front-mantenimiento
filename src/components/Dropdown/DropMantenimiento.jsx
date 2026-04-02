import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DropMantenimiento() {
    return (
        <NavDropdown title="Mantenimiento">
            <NavDropdown.Item as={Link} to="/mantenimientos">
                Mantenimientos
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/fallas">
                Fallas
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/vehiculos">
                Vehiculos
            </NavDropdown.Item>
        </NavDropdown>
    )
}