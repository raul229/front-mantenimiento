import { useCrud } from "@/hooks/useCrud"
import { SedeService } from "@/service/SedeService"
import { useModal } from "@/hooks/useModal";
import { useForm } from "@/hooks/useForm";
import { Button, Table } from "react-bootstrap";
import { SedeModal } from "@/page/ruta/modals/SedeModal";
import { ClienteService } from "@/service/ClienteService"
import { CiudadService } from "@/service/CiudadService";
import { PersonaService } from "@/service/PersonaService";
import { formularioSede } from "@/formularios/formInicial";

export function SedePage() {
    const { data: sedes, loading, crear, actualizar, eliminar } = useCrud(SedeService)
    const { data: clientes } = useCrud(ClienteService)
    const { data: ciudades } = useCrud(CiudadService)
    const { data: personas } = useCrud(PersonaService)
    const { show, ocultarModal, mostrarModal } = useModal();

    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial: formularioSede });

    const guardar = () => {
        try {
            if (editando) {
                actualizar(formulario.id, formulario);
            } else {
                crear(formulario);
            }
            limpiarFormulario();
            ocultarModal();
        } catch (error) {
            console.error("Hubo un error al guardar la sede", error);
        }
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <h1>Sedes</h1>
            <Button
                className="mb-3"
                onClick={() => {
                    limpiarFormulario()
                    setEditando(false);
                    mostrarModal();
                }}>
                Nuevo
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Coordenadas</th>
                        <th>Cliente</th>
                        <th>Ciudad</th>
                        <th>Persona</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sedes.map((sede) => (
                        <tr key={sede.id}>
                            <td>{sede.nombre}</td>
                            <td>{sede.direccion}</td>
                            <td>{sede.coordenadas}</td>
                            <td>{clientes.find((c) => c.id === sede.cliente)?.razon_social}</td>
                            <td>{ciudades.find((c) => c.id === sede.ciudad)?.nombre}</td>
                            <td>{personas.find((p) => p.id === sede.persona)?.nombre}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(sede);
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar la sede?")) {
                                        eliminar(sede.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <SedeModal
                show={show}
                ocultarModal={ocultarModal}
                editando={editando}
                formulario={formulario}
                setFormulario={setFormulario}
                guardar={guardar}
            />
        </>
    )
}