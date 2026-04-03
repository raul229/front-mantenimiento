import { useCrudPage } from "@/hooks/useCrudPage";
import { CelularService } from "@/service/CelularService";
import { Button, Table } from "react-bootstrap";
import { CelularModal } from "./modals/CelularModal";

export function CelularPage() {
    const formularioInicial = {
        numero: "",

    }
    const {
        data: celulares,
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
        guardar } = useCrudPage({ service: CelularService, formularioInicial });

    if (loading) {
        return <div>Cargando...</div>
    }
    return (
        <>
            <h1>Celulares</h1>
            <Button className="mb-3" onClick={() => {
                limpiarFormulario();
                setEditando(false);
                mostrarModal();
            }}>Agregar</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {celulares.map((celular) => (
                        <tr key={celular.id}>
                            <td>{celular.numero}</td>
                            <td>
                                <Button variant="warning" className="me-3" onClick={() => {
                                    setEditando(true);
                                    setFormulario(celular);
                                    mostrarModal();
                                }}>Editar</Button>
                                <Button variant="danger" onClick={() => {
                                    if (window.confirm("¿Estas seguro de eliminar el celular?")) {
                                        eliminar(celular.id);
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CelularModal
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