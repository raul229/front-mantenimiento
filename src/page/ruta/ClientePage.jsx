import { Button, Table } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { ClienteService } from "@/service/ClienteService"
import { useModal } from "@/hooks/useModal";
import { ClienteModal } from "./modals/ClienteModal";
import { useForm } from "../../hooks/useForm";

export function ClientePage() {

    const { data: clientes, loading, crear, actualizar, eliminar } = useCrud(ClienteService);

    const formularioInicial = {
        numero_documento: "",
        nombres: "",
        apellido: "",
        contacto: "",

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