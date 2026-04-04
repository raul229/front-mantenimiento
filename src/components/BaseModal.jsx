import { Button, Modal } from "react-bootstrap";

export function BaseModal({
    show,
    ocultarModal,
    editando,
    guardar,
    titulo,
    children
}) {
    return (
        <Modal show={show} onHide={ocultarModal}>
            <Modal.Header closeButton>
                <Modal.Title>{editando ? "Editar" : "Nuevo"} {titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ocultarModal}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={guardar}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}