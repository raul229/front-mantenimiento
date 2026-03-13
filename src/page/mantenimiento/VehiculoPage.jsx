import { Button, Form, Modal, Table } from "react-bootstrap";
import { useVehiculos } from "@/context/VehiculoContext";
import { useEffect, useState } from "react";
import { guardarEntidad } from "@/utils/guardarEntidad";
import { createVehiculo, deleteVehiculo, updateVehiculo } from "@/service/VehiculoService";
export function VehiculoPage() {
    const { vehiculos, cargarVehiculos } = useVehiculos();
    const [show, setShow] = useState(false);
    const [editando, setEditando] = useState(false);
    const formularioInicial = {
        marca: "",
        modelo: "",
        placa: "",
        carga_neta_kg: "",
        estado: "",
    };
    const [formulario, setFormulario] = useState(formularioInicial);
    const ocultarModal = () => setShow(false);
    const mostrarModal = () => setShow(true);

    const limpiarFormulario = () => {
        setFormulario(formularioInicial);
    };
    const guardar = () => {
        guardarEntidad({
            editando,
            formulario,
            create: createVehiculo,
            update: updateVehiculo,
            recargarDatos: cargarVehiculos,
            ocultarModal,
        });
    };
    const editar = (vehiculo) => {
        mostrarModal();
        setEditando(true);
        setFormulario(vehiculo);
    };
    const eliminar = async (id) => {
        await deleteVehiculo(id);
        cargarVehiculos();
    };

    useEffect(() => {
        cargarVehiculos();
    }, []);
    return (
        <>
            <h1>Vehiculos</h1>
            <Button
                className="mb-3"
                onClick={() => {
                    limpiarFormulario();
                    setEditando(false);
                    mostrarModal();
                }}>
                Nuevo
            </Button>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Carga Neta (kg)</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map((vehiculo) => (
                        <tr key={vehiculo.id}>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.placa}</td>
                            <td>{vehiculo.carga_neta_kg}</td>
                            <td>{vehiculo.estado}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => editar(vehiculo)}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar el vehiculo?")) {
                                        eliminar(vehiculo.id)
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={ocultarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? "Editar" : "Nuevo "} Vehiculo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                value={formulario.marca}
                                onChange={(e) => {
                                    setFormulario({ ...formulario, marca: e.target.value });
                                }}
                                type="text"
                                placeholder="Marca..."
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                value={formulario.modelo}
                                onChange={(e) => {
                                    setFormulario({ ...formulario, modelo: e.target.value });
                                }}
                                type="text"
                                placeholder="Modelo..."
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>placa</Form.Label>
                            <Form.Control
                                value={formulario.placa}
                                onChange={(e) => {
                                    setFormulario({ ...formulario, placa: e.target.value });
                                }}
                                type="text"
                                placeholder="Placa..."
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>carga neta (kg)</Form.Label>
                            <Form.Control
                                value={formulario.carga_neta_kg}
                                onChange={(e) => {
                                    setFormulario({ ...formulario, carga_neta_kg: e.target.value });
                                }}
                                type="number"
                                placeholder="Carga neta (kg)..."
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                value={formulario.estado}
                                onChange={(e) => {
                                    setFormulario({ ...formulario, estado: e.target.value });
                                }}
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                                <option value="mantenimiento">Mantenimiento</option>
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
            </Modal>
        </>
    );
}