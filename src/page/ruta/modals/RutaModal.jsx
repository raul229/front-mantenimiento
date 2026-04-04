import { Form } from "react-bootstrap";
import { BaseModal } from "@/components/BaseModal";
import { useCrud } from "@/hooks/useCrud";
import { SedeService } from "@/service/SedeService";

export function RutaModal({
    show,
    ocultarModal,
    editando,
    formulario,
    setFormulario,
    guardar
}) {
    const { data: sedes } = useCrud(SedeService);
    return (
        <BaseModal
            show={show}
            ocultarModal={ocultarModal}
            editando={editando}
            guardar={guardar}
            titulo="Ruta"
        >
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="Descripcion" value={formulario.descripcion} onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Sedes</Form.Label>
                    <Form.Select
                        value={formulario.sedes}
                        onChange={
                            (e) => {
                                setFormulario({ ...formulario, sedes: Array.from(e.target.selectedOptions, (option) => Number(option.value)) })
                            }
                        }
                        multiple
                    >
                        <option value={null}>Seleccione</option>
                        {sedes.map((sede) => (
                            <option key={sede.id} value={sede.id}>
                                {sede.nombre}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </BaseModal>
    )
}