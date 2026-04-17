import { Form } from "react-bootstrap";
import { BaseModal } from "@/components/BaseModal";
import { useCrud } from "@/hooks/useCrud";
import { SedeService } from "@/service/SedeService";
import { ViajeService } from "@/service/ViajeService";

export function RecojoModal({
    show,
    ocultarModal,
    editando,
    formulario,
    setFormulario,
    guardar,
}) {
    const { data: sedes } = useCrud(SedeService);
    const { data: viajes } = useCrud(ViajeService);

    return (
        <BaseModal
            show={show}
            ocultarModal={ocultarModal}
            editando={editando}
            guardar={guardar}
            titulo="Recojo"
        >
            <Form>
                <Form.Group>
                    <Form.Label>Viaje</Form.Label>
                    <Form.Select
                        value={formulario.viaje || ""}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                viaje: Number(e.target.value) || "",
                            })
                        }
                        required
                    >
                        <option value="">Seleccione</option>
                        {viajes.map((viaje) => (
                            <option key={viaje.id} value={viaje.id}>
                                {`#${viaje.id} - ${viaje.estado}`}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sede</Form.Label>
                    <Form.Select
                        value={formulario.sede || ""}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                sede: Number(e.target.value) || "",
                            })
                        }
                        required
                    >
                        <option value="">Seleccione</option>
                        {sedes.map((sede) => (
                            <option key={sede.id} value={sede.id}>
                                {sede.nombre}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Peso (kg)</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Ingrese el peso"
                        value={formulario.peso_kg ?? ""}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                peso_kg: e.target.value,
                            })
                        }
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        value={formulario.fecha ?? ""}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                fecha: e.target.value,
                            })
                        }
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={formulario.observaciones ?? ""}
                        onChange={(e) =>
                            setFormulario({
                                ...formulario,
                                observaciones: e.target.value,
                            })
                        }
                    />
                </Form.Group>
            </Form>
        </BaseModal>
    );
}
