import { Container } from "react-bootstrap";
import { NavbarMantenimiento } from "../components/NavbasMantenimiento";
import { Outlet } from "react-router-dom";
export function Layout() {
    return (
        <>
            <NavbarMantenimiento />
            <Container className="mt-4">
                <Outlet />
            </Container>
        </>
    );
}
