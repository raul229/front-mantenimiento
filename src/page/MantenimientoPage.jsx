import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { getMantenimientos } from "../service/MantenimientoService";
import { getFallas } from "../service/FallaService";
import { getVehiculos } from "../service/VehiculoService";

export function MantenimientoPage() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [mantenimientos, setMantenimientos] = useState([]);
    const [fallas, setFallas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);

    const cargarMantenimientos = async () => {
        const { data } = await getMantenimientos()

        setMantenimientos(data)
    }

    const cargarFallas = async () => {
        const { data } = await getFallas()
        setFallas(data)
    };
    const cargarVehiculos = async () => {
        const { data } = await getVehiculos()
        setVehiculos(data)
    }

    useEffect(() => {


        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarMantenimientos()
        cargarFallas()
        cargarVehiculos()

    }, [])

    return (
        <>
            <h1 className="mb-3">Mantenimientos</h1>

            <Button className="mb-3" onClick={handleShow}>
                Nuevo
            </Button>

            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Descripcion</th>
                        <th>Costo</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Proveedor</th>
                        <th>Vehiculo</th>
                        <th>Fallas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mantenimientos.map((mantenimiento) => (
                            <tr key={mantenimiento.id}>
                                <td>{mantenimiento.tipo_mantenimiento}</td>
                                <td>{mantenimiento.descripcion}</td>
                                <td>S/. {mantenimiento.costo}</td>
                                <td>{mantenimiento.fecha_inicio}</td>
                                <td>{mantenimiento.fecha_fin}</td>
                                <td>{mantenimiento.proveedor}</td>
                                <td>
                                    {
                                        vehiculos.find(v => v.id === mantenimiento.vehiculo)?.marca
                                    }</td>
                                <td>
                                    {
                                        mantenimiento.fallas
                                            .map(id => fallas.find(f => f.id === id)?.descripcion)
                                            .join(", ")

                                    }
                                </td>
                                <td><Button className="me-3" variant="warning">Editar</Button><Button variant="danger">Eliminar</Button></td>
                            </tr>

                        ))
                    }

                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo mantenimiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Tipo de mantenimiento
                            </Form.Label>
                            <Form.Select>
                                <option>Seleccione</option>
                                <option value="preventivo" >Preventivo</option>
                                <option value="correlativo" >Correctivo</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Descripcion
                            </Form.Label>
                            <Form.Control type="text" placeholder="Descripcion..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Costo
                            </Form.Label>
                            <Form.Control type="number" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Fecha Inicio
                            </Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Fecha Fin
                            </Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Proveedor
                            </Form.Label>
                            <Form.Control type="text" placeholder="Descripcion..." />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Vehiculo
                            </Form.Label>
                            <Form.Select  >
                                <option>Seleccione</option>
                                {
                                    vehiculos.map((vehiculo) => (

                                        < option key={vehiculo.id} value={vehiculo.id} >{vehiculo.marca}   {vehiculo.placa}</option>

                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Fallas
                            </Form.Label>
                            <Form.Select multiple >
                                {
                                    fallas.map((falla) => (
                                        <option key={falla.id} value={falla.id} >{falla.descripcion}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>


                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
