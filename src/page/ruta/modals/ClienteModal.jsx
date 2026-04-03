import { Button, Form, Modal } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { PersonaService } from "@/service/PersonaService";

export function ClienteModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {
    const { data: personas } = useCrud(PersonaService);

    return (
        <Modal show={show} onHide={ocultarModal}>
            <Modal.Header closeButton>
                <Modal.Title>{editando ? "Editar" : "Nuevo"} Cliente    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Numero documento</Form.Label>
                        <Form.Control
                            value={formulario.numero_documento}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    numero_documento: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Numero documento..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Razon social</Form.Label>
                        <Form.Control
                            value={formulario.razon_social}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    razon_social: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Razon social..."
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Persona</Form.Label>
                        <Form.Select
                            value={formulario.persona}
                            onChange={(e) => {
                                setFormulario({
                                    ...formulario,
                                    persona: Number(e.target.value),
                                });
                            }}
                            type="text"
                            placeholder="Persona..."
                            required
                        >
                            <option value="">Seleccione</option>
                            {personas.map((persona) => (
                                <option key={persona.id} value={persona.id}>
                                    {persona.nombre}
                                </option>
                            ))}
                        </Form.Select>
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