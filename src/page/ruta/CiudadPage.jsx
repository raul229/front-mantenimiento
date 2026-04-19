import { useCrud } from "@/hooks/useCrud";
import { CiudadService } from "@/service/CiudadService";
import { CiudadModal } from "./modals/CiudadModal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "@/hooks/useForm";
import { Button, Table } from "react-bootstrap";
import { formularioCiudad } from "@/formularios/formInicial";

export function CiudadPage() {
    const { data: ciudades, loading, crear, actualizar, eliminar } = useCrud(CiudadService);
    const { show, ocultarModal, mostrarModal } = useModal();
    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial: formularioCiudad });
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
            console.error("Hubo un error al guardar la ciudad", error);
        }
    }
    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <>
            <h1>Ciudad</h1>
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
                        <th>Distrito</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ciudades.map((ciudad) => (
                        <tr key={ciudad.id}>
                            <td>{ciudad.nombre}</td>
                            <td>{ciudad.distrito}</td>
                            <td>{ciudad.departamento}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(ciudad);
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar la ciudad?")) {
                                        eliminar(ciudad.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CiudadModal
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