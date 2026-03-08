import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import {
  getMantenimientos,
  createMantenimiento,
  updateMantenimiento,
  deleteMantenimiento,
} from "../service/MantenimientoService";
import { getFallas } from "../service/FallaService";
import { useVehiculos } from "../context/VehiculoContext";

export function MantenimientoPage() {
  const [show, setShow] = useState(false);

  const [editando, setEditando] = useState(false);

  const ocultarModal = () => setShow(false);
  const mostrarModal = () => setShow(true);

  const formularioInicial = {
    tipo_mantenimiento: "",
    descripcion: "",
    costo: "",
    fecha_inicio: "",
    fecha_fin: "",
    proveedor: "",
    vehiculo: "",
    fallas: [],
  };

  const [formulario, setFormulario] = useState(formularioInicial);

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
  };

  const [mantenimientos, setMantenimientos] = useState([]);
  const [fallas, setFallas] = useState([]);
  const { vehiculos } = useVehiculos();

  const guardar = async () => {
    if (editando) {
      await updateMantenimiento(formulario.id, formulario);
    } else {
      await createMantenimiento(formulario);
    }
    ocultarModal();
    cargarMantenimientos();
  };

  const eliminar = async (id) => {
    await deleteMantenimiento(id);
    cargarMantenimientos();
  };

  const cargarMantenimientos = async () => {
    const { data } = await getMantenimientos();

    setMantenimientos(data);
  };

  const cargarFallas = async () => {
    const { data } = await getFallas();
    setFallas(data);
  };

  const editar = (m) => {
    mostrarModal();
    setEditando(true);
    setFormulario(m);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarMantenimientos();
    cargarFallas();
  }, []);

  return (
    <>
      <h1 className="mb-3">Mantenimientos</h1>

      <Button
        className="mb-3"
        onClick={() => {
          limpiarFormulario();
          setEditando(false);
          mostrarModal();
        }}
      >
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
          {mantenimientos.map((mantenimiento) => (
            <tr key={mantenimiento.id}>
              <td>{mantenimiento.tipo_mantenimiento}</td>
              <td>{mantenimiento.descripcion}</td>
              <td>S/. {mantenimiento.costo}</td>
              <td>{mantenimiento.fecha_inicio}</td>
              <td>{mantenimiento.fecha_fin}</td>
              <td>{mantenimiento.proveedor}</td>
              <td>
                {vehiculos.find((v) => v.id === mantenimiento.vehiculo)?.marca}
              </td>
              <td>
                {mantenimiento.fallas
                  .map((id) => fallas.find((f) => f.id === id)?.descripcion)
                  .join(", ")}
              </td>
              <td>
                <Button
                  className="me-3"
                  variant="warning"
                  onClick={() => editar(mantenimiento)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Estas seguro de eliminar el mantenimiento?",
                      )
                    ) {
                      eliminar(mantenimiento.id);
                    }
                  }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={ocultarModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar" : "Nuevo "} mantenimiento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tipo de mantenimiento</Form.Label>
              <Form.Select
                value={formulario.tipo_mantenimiento}
                onChange={(e) => {
                  setFormulario({
                    ...formulario,
                    tipo_mantenimiento: e.target.value,
                  });
                }}
              >
                <option value="">Seleccione</option>
                <option value="preventivo">Preventivo</option>
                <option value="correctivo">Correctivo</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                value={formulario.descripcion}
                onChange={(e) => {
                  setFormulario({ ...formulario, descripcion: e.target.value });
                }}
                type="text"
                placeholder="Descripcion..."
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Costo</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setFormulario({
                    ...formulario,
                    costo: Number(e.target.value),
                  });
                }}
                value={formulario.costo}
                type="number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control
                value={formulario.fecha_inicio}
                type="date"
                onChange={(e) => {
                  setFormulario({
                    ...formulario,
                    fecha_inicio: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control
                value={formulario.fecha_fin}
                onChange={(e) => {
                  setFormulario({ ...formulario, fecha_fin: e.target.value });
                }}
                type="date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                value={formulario.proveedor}
                onChange={(e) => {
                  setFormulario({ ...formulario, proveedor: e.target.value });
                }}
                type="text"
                placeholder="Descripcion..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vehiculo</Form.Label>
              <Form.Select
                value={formulario.vehiculo}
                onChange={(e) => {
                  setFormulario({
                    ...formulario,
                    vehiculo: Number(e.target.value) || "",
                  });
                }}
              >
                <option value="">Seleccione</option>
                {vehiculos.map((vehiculo) => (
                  <option key={vehiculo.id} value={vehiculo.id}>
                    {vehiculo.marca} {vehiculo.placa}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Fallas</Form.Label>
              <Form.Select
                multiple={true}
                value={formulario.fallas}
                onChange={(e) => {
                  setFormulario({
                    ...formulario,
                    fallas: Array.from(e.target.selectedOptions, (option) =>
                      Number(option.value),
                    ),
                  });
                }}
              >
                {fallas.map((falla) => (
                  <option key={falla.id} value={falla.id}>
                    {falla.descripcion}
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
          <Button type="submit" variant="primary" onClick={guardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
