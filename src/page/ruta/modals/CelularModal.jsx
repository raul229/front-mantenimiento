import { Button, Form, Modal } from "react-bootstrap";

export function CelularModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {
    return (
        <Modal show={show} onHide={ocultarModal}>
            <Modal.Header closeButton>
                <Modal.Title>{editando ? "Editar" : "Nuevo"} Celular</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Numero</Form.Label>
                        <Form.Control type="text" placeholder="Numero" value={formulario.numero} onChange={(e) => setFormulario({ ...formulario, numero: e.target.value })} />
                    </Form.Group>
                </Form>
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