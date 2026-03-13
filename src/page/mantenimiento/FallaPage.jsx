import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { getFallas, createFalla, updateFalla, deleteFalla } from "@/service/FallaService";
import { useVehiculos } from "@/context/VehiculoContext";
import { guardarEntidad } from "@/utils/guardarEntidad";

export function FallaPage() {
  const [fallas, setFallas] = useState([]);
  const [show, setShow] = useState(false);
  const [editando, setEditando] = useState(false);
  const { vehiculos } = useVehiculos();

  const ocultarModal = () => setShow(false);
  const mostrarModal = () => setShow(true);

  const formularioInicial = {
    descripcion: "",
    fecha_reportado: "",
    fecha_solucionado: "",
    vehiculo: "",
    usuario_reporta: "",
    estado: "",
    prioridad: "",
  };

  const [formulario, setFormulario] = useState(formularioInicial);
  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
  };

  const cargarFallas = async () => {
    const { data } = await getFallas();
    setFallas(data);
  };

  const guardar = () => {
    guardarEntidad({
      editando,
      formulario,
      create: createFalla,
      update: updateFalla,
      recargarDatos: cargarFallas,
      ocultarModal,
    });

  };

  const eliminar = async (id) => {
    await deleteFalla(id);
    cargarFallas();
  };

  const editar = (falla) => {
    mostrarModal();
    setEditando(true);
    setFormulario(falla);
  };

  useEffect(() => {
    cargarFallas();
  }, []);

  return (
    <>
      <h1>Fallas</h1>
      <Button
        className="mb-3"

        onClick={() => {
          limpiarFormulario();
          setEditando(false);
          mostrarModal();
        }}>
        Nuevo</Button>
      <Table hover striped bordered>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Descripcion</th>
            <th>Fecha Reportado</th>
            <th>Fecha Solucionado</th>
            <th>Vehiculo</th>
            <th>Usuario que reporta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fallas.map((falla) => (
            <tr key={falla.id}>
              <td>{falla.estado}</td>
              <td>{falla.prioridad}</td>
              <td>{falla.descripcion}</td>
              <td>{falla.fecha_reportado}</td>
              <td>{falla.fecha_solucionado}</td>
              <td>{
                vehiculos.find((v) => v.id === falla.vehiculo)?.marca
              }</td>
              <td>{falla.usuario_reporta}</td>
              <td>
                <Button className="me-3" variant="warning" onClick={() => editar(falla)}>Editar</Button>
                <Button variant="danger" onClick={() => {
                  if (window.confirm("¿Estas seguro de eliminar la falla?")) {
                    eliminar(falla.id)
                  }
                }}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={ocultarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? "Editar" : "Nueva"} Falla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                <option value="pendiente">Pendiente</option>
                <option value="solucionado">Solucionado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Prioridad</Form.Label>
              <Form.Select
                value={formulario.prioridad}
                onChange={(e) => {
                  setFormulario({ ...formulario, prioridad: e.target.value });
                }}
                required
              >
                <option value="">Seleccione</option>
                <option value="critica">Critica</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
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
              <Form.Label>Fecha Reportado</Form.Label>
              <Form.Control
                value={formulario.fecha_reportado}
                onChange={(e) => {
                  setFormulario({ ...formulario, fecha_reportado: e.target.value });
                }}
                type="date"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Solucionado</Form.Label>
              <Form.Control
                value={formulario.fecha_solucionado}
                onChange={(e) => {
                  setFormulario({ ...formulario, fecha_solucionado: e.target.value });
                }}
                type="date"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vehiculo</Form.Label>
              <Form.Select
                value={formulario.vehiculo}
                onChange={(e) => {
                  setFormulario({ ...formulario, vehiculo: Number(e.target.value) || "" });
                }}
                required
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
              <Form.Label>Usuario que reporta</Form.Label>
              <Form.Control
                value={formulario.usuario_reporta}
                onChange={(e) => {
                  setFormulario({ ...formulario, usuario_reporta: Number(e.target.value) || "" });
                }}
                type="text"
                placeholder="Usuario que reporta..."
                required
              />
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
