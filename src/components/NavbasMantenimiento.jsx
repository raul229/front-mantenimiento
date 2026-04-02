import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DropMantenimiento } from "./Dropdown/DropMantenimiento";
import { DropRuta } from "./Dropdown/DropRuta";

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
            {/* impoportamos los dropdown de cada modulo */}
            <DropMantenimiento />
            <DropRuta />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
