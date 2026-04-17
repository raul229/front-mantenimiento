import { useCrudPage } from "@/hooks/useCrudPage";
import { useCrud } from "@/hooks/useCrud";
import { RecojoService } from "@/service/RecojoService";
import { ViajeService } from "@/service/ViajeService";
import { SedeService } from "@/service/SedeService";
import { BotonNuevo } from "@/components/BotonNuevo";
import { Button, Table } from "react-bootstrap";
import { RecojoModal } from "./modals/RecojoModal";

export function RecojoPage() {
    const formularioInicial = {
        viaje: "",
        sede: "",
        peso_kg: "",
        fecha: "",
        observaciones: "",
    };

    const {
        data: recojos,
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
        guardar,
    } = useCrudPage({ service: RecojoService, formularioInicial });

    const { data: sedes, loading: loadingSedes } = useCrud(SedeService);
    const { data: viajes, loading: loadingViajes } = useCrud(ViajeService);

    if (loading || loadingSedes || loadingViajes) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <h1>Recojos</h1>
            <BotonNuevo
                limpiarFormulario={limpiarFormulario}
                setEditando={setEditando}
                mostrarModal={mostrarModal}
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Viaje</th>
                        <th>Sede</th>
                        <th>Peso (kg)</th>
                        <th>Fecha</th>
                        <th>Observaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recojos.map((recojo) => {
                        const viaje = viajes.find((v) => v.id === recojo.viaje);
                        const sede = sedes.find((s) => s.id === recojo.sede);
                        return (
                            <tr key={recojo.id}>
                                <td>
                                    {viaje
                                        ? `#${viaje.id} ${viaje.estado || ""}`
                                        : "-"}
                                </td>
                                <td>{sede?.nombre ?? "-"}</td>
                                <td>{recojo.peso_kg ?? "-"}</td>
                                <td>{recojo.fecha ?? "-"}</td>
                                <td>{recojo.observaciones ?? "-"}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-3"
                                        onClick={() => {
                                            setEditando(true);
                                            setFormulario(recojo);
                                            mostrarModal();
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "¿Estas seguro de eliminar el recojo?",
                                                )
                                            ) {
                                                eliminar(recojo.id);
                                            }
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <RecojoModal
                show={show}
                ocultarModal={ocultarModal}
                editando={editando}
                formulario={formulario}
                setFormulario={setFormulario}
                guardar={guardar}
            />
        </>
    );
}
