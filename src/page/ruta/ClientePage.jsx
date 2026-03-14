import { Button, Form, Modal, Table } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { ClienteService } from "@/service/ClienteService"
import { useState } from "react";
import { guardarEntidad } from "@/utils/guardarEntidad";

export function ClientePage() {

    const { data: clientes, loading, cargarDatos, crear, actualizar, eliminar } = useCrud(ClienteService);

    const [show, setShow] = useState(false);
    const [editando, setEditando] = useState(false);

    const ocultarModal = () => setShow(false);
    const mostrarModal = () => setShow(true);


    const formularioInicial = {
        numero_documento: "",
        nombres: "",
        apellido: "",
        contacto: "",
    };

    const [formulario, setFormulario] = useState(formularioInicial);

    const limpiarFormulario = () => {
        setFormulario(formularioInicial);
    };

    const guardar = () => {
        guardarEntidad({
            editando,
            formulario,
            create: crear,
            update: actualizar,
            recargarDatos: cargarDatos,
            ocultarModal,
        });
    };

    const eliminarCliente = async (id) => {
        await eliminar(id);
        cargarDatos();
    };

    const editarCliente = (cliente) => {
        mostrarModal();
        setEditando(true);
        setFormulario(cliente);
    };

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <h1>Clientes</h1>
            <Button
                className="mb-3"
                onClick={() => {
                    limpiarFormulario();
                    setEditando(false);
                    mostrarModal();
                }}>
                Nuevo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Documento</th>
                        <th>Nombres</th>
                        <th>Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.numero_documento}</td>
                            <td>{cliente.nombres} {cliente.apellido}</td>
                            <td>{cliente.contacto}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(cliente);
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar el cliente?")) {
                                        eliminar(cliente.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
        </>
    )
}   