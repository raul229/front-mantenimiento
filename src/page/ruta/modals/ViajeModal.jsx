import { BaseModal } from "@/components/BaseModal";
import { Form } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { VehiculoService } from "@/service/VehiculoService";
import { RutaService } from "@/service/RutaService";

export function ViajeModal({ show, ocultarModal, guardar, formulario, setFormulario, editando }) {
    const { data: vehiculos } = useCrud(VehiculoService);
    const { data: rutas } = useCrud(RutaService);
    return (<BaseModal show={show}
        ocultarModal={ocultarModal}
        editando={editando}
        guardar={guardar}
        titulo="Viaje">
        <Form>
            <Form.Group>
                <Form.Label>Kilometraje Inicio</Form.Label>
                <Form.Control type="number" placeholder="Ingrese el kilometraje de inicio" value={formulario.kilometraje_inicio} onChange={(e) => setFormulario({ ...formulario, kilometraje_inicio: e.target.value })} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Kilometraje Final</Form.Label>
                <Form.Control type="number" placeholder="Ingrese el kilometraje final" value={formulario.kilometraje_final} onChange={(e) => setFormulario({ ...formulario, kilometraje_final: e.target.value })} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select value={formulario.estado} onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}>
                    <option value="">Seleccione</option>
                    <option value="programado">programado</option>
                    <option value="en curso">en curso</option>
                    <option value="completado">completado</option>
                    <option value="cancelado">cancelado</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control type="date" placeholder="Ingrese la fecha de inicio" value={formulario.fecha_inicio} onChange={(e) => setFormulario({ ...formulario, fecha_inicio: e.target.value })} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control type="date" placeholder="Ingrese la fecha de fin" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Observaciones</Form.Label>
                <Form.Control type="text" placeholder="Ingrese las observaciones" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Vehiculo</Form.Label>
                <Form.Select value={formulario.vehiculo} onChange={(e) => setFormulario({ ...formulario, vehiculo: e.target.value })}>
                    <option value="">Seleccione</option>
                    {vehiculos.map((vehiculo) => (
                        <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.marca}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Conductor</Form.Label>
                <Form.Control value={formulario.conductor} onChange={(e) => setFormulario({ ...formulario, conductor: Number(e.target.value) })} type="text" placeholder="Ingrese el conductor" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ruta</Form.Label>
                <Form.Select value={formulario.ruta} onChange={(e) => setFormulario({ ...formulario, ruta: e.target.value })}>
                    <option value="">Seleccione</option>
                    {rutas.map((ruta) => (
                        <option key={ruta.id} value={ruta.id}>{ruta.nombre}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    </BaseModal>)
}