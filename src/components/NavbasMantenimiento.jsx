import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavbarMantenimiento() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Sermin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
