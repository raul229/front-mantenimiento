import { Button, Form, Modal } from "react-bootstrap";

export function ClienteModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {

    return (
        <Modal show={show} onHide={ocultarModal}>
            <Modal.Header closeButton>
                <Modal.Title>{editando ? "Editar" : "Nuevo"} Cliente    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Documento</Form.Label>
                        <Form.Control
                            value={formulario.numero_documento}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    numero_documento: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Documento..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            value={formulario.nombres}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    nombres: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Nombres..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            value={formulario.apellido}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    apellido: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Apellido..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            value={formulario.contacto}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    contacto: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Contacto..."
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ocultarModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={guardar}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}