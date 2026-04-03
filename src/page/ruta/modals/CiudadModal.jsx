import { Button, Form, Modal } from "react-bootstrap";

export function CiudadModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {

    return (
        <Modal show={show} onHide={ocultarModal}>
            <Modal.Header>
                <Modal.Title>{editando ? "Editar" : "Nuevo"} Ciudad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            value={formulario.nombre}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    nombre: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Nombre..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Distrito</Form.Label>
                        <Form.Control
                            value={formulario.distrito}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    distrito: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Distrito..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Departamento</Form.Label>
                        <Form.Control
                            value={formulario.departamento}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    departamento: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Departamento..."
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ocultarModal}>Cerrar</Button>
                <Button variant="primary" onClick={guardar}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}