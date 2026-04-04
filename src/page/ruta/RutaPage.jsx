import { useCrudPage } from "@/hooks/useCrudPage"
import { RutaService } from "@/service/RutaService"
import { SedeService } from "@/service/SedeService"
import { useCrud } from "@/hooks/useCrud"
import { BotonNuevo } from "@/components/BotonNuevo"
import { Button, Table } from "react-bootstrap"
import { RutaModal } from "./modals/RutaModal"

export function RutaPage() {

    const formularioInicial = {
        nombre: "",
        descripcion: "",
        sedes: [],
    }

    const {
        data: rutas,
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
    } = useCrudPage({ service: RutaService, formularioInicial })
    const { data: sedes } = useCrud(SedeService);

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <>
            <h1>Rutas</h1>
            <BotonNuevo
                limpiarFormulario={limpiarFormulario}
                setEditando={setEditando}
                mostrarModal={mostrarModal}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Sedes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rutas.map((ruta) => (
                        <tr key={ruta.id}>
                            <td>{ruta.nombre}</td>
                            <td>{ruta.descripcion}</td>
                            <td>{sedes.filter((sede) => ruta.sedes.includes(sede.id)).map((sede) => sede.nombre).join(", ")}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(ruta);
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar la ruta?")) {
                                        eliminar(ruta.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <RutaModal
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