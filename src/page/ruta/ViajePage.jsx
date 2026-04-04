import { useCrudPage } from "@/hooks/useCrudPage";
import { useCrud } from "@/hooks/useCrud";
import { VehiculoService } from "@/service/VehiculoService";
import { RutaService } from "@/service/RutaService";
import { ViajeService } from "@/service/ViajeService";
import { Table } from "react-bootstrap";
import { BotonNuevo } from "@/components/BotonNuevo";
import { Button } from "react-bootstrap";
import { ViajeModal } from "./modals/ViajeModal";

export function ViajePage() {
    const formularioInicial = {
        kilometraje_inicio: "",
        kilometraje_final: "",
        estado: "",
        fecha_inicio: "",
        fecha_fin: "",
        observaciones: "",
        vehiculo: "",
        conductor: "",
        ruta: "",
    }
    const { data: vehiculos } = useCrud(VehiculoService);
    const { data: rutas } = useCrud(RutaService);
    const {
        data: viajes,
        loading,
        eliminar,
        show,
        ocultarModal,
        mostrarModal,
        formulario,
        setFormulario,
        limpiarFormulario,
        editando,
        setEditando,
        guardar
    } = useCrudPage({ service: ViajeService, formularioInicial });

    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <>
            <h1>Viajes</h1>
            <BotonNuevo
                limpiarFormulario={limpiarFormulario}
                setEditando={setEditando}
                mostrarModal={mostrarModal}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Kilometraje Inicio</th>
                        <th>Kilometraje Final</th>
                        <th>Estado</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Observaciones</th>
                        <th>Vehiculo</th>
                        <th>Conductor</th>
                        <th>Ruta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {viajes.map((viaje) => (
                        <tr key={viaje.id}>
                            <td>{viaje.kilometraje_inicio}</td>
                            <td>{viaje.kilometraje_final}</td>
                            <td>{viaje.estado}</td>
                            <td>{viaje.fecha_inicio}</td>
                            <td>{viaje.fecha_fin}</td>
                            <td>{viaje.observaciones}</td>
                            <td>{vehiculos.find((v) => v.id === viaje.vehiculo)?.marca}</td>
                            <td>{viaje.conductor}</td>
                            <td>{rutas.find((r) => r.id === viaje.ruta)?.nombre}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(viaje);
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar el viaje?")) {
                                        eliminar(viaje.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ViajeModal
                show={show}
                ocultarModal={ocultarModal}
                guardar={guardar}
                formulario={formulario}
                setFormulario={setFormulario}
                editando={editando}
            />
        </>
    )
}