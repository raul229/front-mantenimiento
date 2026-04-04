import { useCrudPage } from "@/hooks/useCrudPage";
import { useCrud } from "@/hooks/useCrud";
import { PersonaService } from "@/service/PersonaService";
import { CelularService } from "@/service/CelularService";
import { Button, Table } from "react-bootstrap";
import { BotonNuevo } from "@/components/BotonNuevo";
import { PersonaModal } from "./modals/PersonaModal";

export function PersonaPage() {
    const formularioInicial = {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        cargo: "",
        celular: "",
    }
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
        guardar } = useCrudPage({ service: PersonaService, formularioInicial });

    const { data: celulares } = useCrud(CelularService);


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
                        <th>Celular</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id}>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellido_paterno} {persona.apellido_materno}</td>
                            <td>{persona.cargo}</td>
                            <td>{celulares.find((celular) => celular.id === persona.celular)?.numero}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(persona);
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
