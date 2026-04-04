import { Form } from "react-bootstrap";
import { useCrud } from "@/hooks/useCrud";
import { CelularService } from "@/service/CelularService";
import { BaseModal } from "@/components/BaseModal";

export function PersonaModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {

    const { data: celulares } = useCrud(CelularService);
    return (
        <BaseModal
            show={show}
            ocultarModal={ocultarModal}
            editando={editando}
            guardar={guardar}
            titulo="Persona"
        >
            <Form>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control type="text" placeholder="Apellido Paterno" value={formulario.apellido_paterno} onChange={(e) => setFormulario({ ...formulario, apellido_paterno: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type="text" placeholder="Apellido Materno" value={formulario.apellido_materno} onChange={(e) => setFormulario({ ...formulario, apellido_materno: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" placeholder="Cargo" value={formulario.cargo} onChange={(e) => setFormulario({ ...formulario, cargo: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Celular</Form.Label>
                    <Form.Select
                        value={formulario.celular}
                        onChange={(e) => setFormulario({ ...formulario, celular: Number(e.target.value) })}
                    >
                        <option value={null}>Seleccione</option>
                        {celulares.map((celular) => (
                            <option key={celular.id} value={celular.id}>
                                {celular.numero}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </BaseModal>
    )
}