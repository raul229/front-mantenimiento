import { Button, Form, Modal } from "react-bootstrap"
import { ClienteService } from "@/service/ClienteService"
import { useCrud } from "@/hooks/useCrud"
import { CiudadService } from "@/service/CiudadService"

export function SedeModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {
    const { data: clientes } = useCrud(ClienteService)
    const { data: ciudades } = useCrud(CiudadService)
    return (<Modal show={show} onHide={ocultarModal} >


        <Modal.Header closeButton>
            <Modal.Title>{editando ? "Editar" : "Nueva"} Sede</Modal.Title>
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
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control
                        value={formulario.direccion}
                        onChange={(e) => {
                            setFormulario({
                                ...formulario,
                                direccion: e.target.value,
                            });
                        }}
                        type="text"
                        placeholder="Direccion..."
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Coordenadas</Form.Label>
                    <Form.Control
                        value={formulario.coordenadas}
                        onChange={(e) => {
                            setFormulario({
                                ...formulario,
                                coordenadas: e.target.value,
                            });
                        }}
                        type="text"
                        placeholder="Coordenadas..."
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
                <Form.Group>
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select
                        value={formulario.cliente}
                        onChange={(e) => {
                            setFormulario({
                                ...formulario,
                                cliente: Number(e.target.value),
                            });
                        }}
                        required
                    >
                        <option value="">Seleccione</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombres}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Select
                        value={formulario.ciudad}
                        onChange={(e) => {
                            setFormulario({
                                ...formulario,
                                ciudad: Number(e.target.value),
                            });
                        }}
                        required
                    >
                        <option value="">Seleccione</option>
                        {ciudades.map((ciudad) => (
                            <option key={ciudad.id} value={ciudad.id}>
                                {ciudad.nombre}
                            </option>
                        ))}
                    </Form.Select>
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
    </Modal>)
}