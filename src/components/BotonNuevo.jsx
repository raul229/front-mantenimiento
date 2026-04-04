import { Button } from "react-bootstrap";

export function BotonNuevo({ limpiarFormulario, setEditando, mostrarModal, texto = "Nuevo" }) {
    const handleClick = () => {
        limpiarFormulario();
        setEditando(false);
        mostrarModal();
    }
    return (
        <Button variant="primary" className="mb-3" onClick={handleClick}>
            {texto}
        </Button>
    )
}