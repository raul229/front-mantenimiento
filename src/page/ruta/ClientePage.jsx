import { Button, Table } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { ClienteService } from "@/service/ClienteService"
import { useModal } from "@/hooks/useModal";
import { ClienteModal } from "./modals/ClienteModal";
import { useForm } from "@/hooks/useForm";
import { PersonaService } from "@/service/PersonaService";

export function ClientePage() {

    const { data: clientes, loading, crear, actualizar, eliminar } = useCrud(ClienteService);
    const { data: personas } = useCrud(PersonaService);

    const formularioInicial = {
        numero_documento: "",
        razon_social: "",
        persona: "",

    };
    const { show, ocultarModal, mostrarModal } = useModal();

    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial });

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
            console.error("Hubo un error al guardar el cliente", error);
        }
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <h1>Clientes</h1>
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
                        <th>Documento</th>
                        <th>Razon Social</th>
                        <th>Persona</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.numero_documento}</td>
                            <td>{cliente.razon_social}</td>
                            <td>{personas.find((p) => p.id == cliente.persona)?.nombre}</td>
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
            <ClienteModal
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