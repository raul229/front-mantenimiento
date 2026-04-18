import { useCrudPage } from "@/hooks/useCrudPage";
import { useCrud } from "@/hooks/useCrud";
import { PersonaService } from "@/service/PersonaService";
import { CelularService } from "@/service/CelularService";
import { ClienteService } from "@/service/ClienteService";
import { Button, Table } from "react-bootstrap";
import { BotonNuevo } from "@/components/BotonNuevo";
import { PersonaModal } from "./modals/PersonaModal";

export function PersonaPage() {
    const formularioInicial = {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        cargo: "",
        cliente: "",
        celulares: [""]
    }
    const { data: celulares, cargarDatos: cargarCelulares } = useCrud(CelularService);
    const { data: clientes } = useCrud(ClienteService);
    const {
        data: personas,
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
    } = useCrudPage({ service: PersonaService, formularioInicial, actulizacionDatosSecundarios: cargarCelulares });



    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <h1>Personas</h1>
            <BotonNuevo
                limpiarFormulario={limpiarFormulario}
                setEditando={setEditando}
                mostrarModal={mostrarModal}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cargo</th>
                        <th>Cliente</th>
                        <th>Celulares</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id}>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellido_paterno} {persona.apellido_materno}</td>
                            <td>{persona.cargo}</td>
                            <td>
                                {clientes.find(c => c.id === persona.cliente)?.razon_social || "N/A"}
                            </td>
                            <td>
                                {celulares?.filter(c => c?.persona === persona.id).map(c => c.numero).join(', ') || 'Sin celulares'}
                            </td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    // Obtener los números de celular de esta persona
                                    const celularesPersona = celulares?.filter(c => c?.persona === persona.id).map(c => c.numero) || [];
                                    setFormulario({
                                        ...persona,
                                        // Convertimos los celulares existentes a números, si no hay pasa array vacío
                                        celulares: celularesPersona
                                    });
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar la persona?")) {
                                        eliminar(persona.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <PersonaModal
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
