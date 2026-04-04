import { Container } from "react-bootstrap";
import { NavbarMantenimiento } from "@/components/NavbasMantenimiento";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
export function Layout() {
    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            <NavbarMantenimiento />
            <Container className="mt-4">
                <Outlet />
            </Container>
        </>
    );
}
