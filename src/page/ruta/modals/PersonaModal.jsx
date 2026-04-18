import { Button, Form, InputGroup } from "react-bootstrap";
import { BaseModal } from "@/components/BaseModal";
import { useCrud } from "@/hooks/useCrud";
import { ClienteService } from "@/service/ClienteService";

export function PersonaModal({ show, ocultarModal, editando, formulario, setFormulario, guardar }) {
    // Validamos que los celulares sean un array y aseguramos al menos un campo
    const celularesFormulario = Array.isArray(formulario.celulares) && formulario.celulares.length > 0 ? formulario.celulares : [""];

    const { data: clientes } = useCrud(ClienteService);

    // Función para agregar un nuevo campo de celular
    const agregarCampoCelular = () => {
        setFormulario({
            ...formulario,
            celulares: [...celularesFormulario, ""]
        });
    };

    // Función para eliminar un campo de celular
    const eliminarCampoCelular = (index) => {
        if (celularesFormulario.length > 1) {
            const nuevosCelulares = [...celularesFormulario];
            nuevosCelulares.splice(index, 1);
            setFormulario({
                ...formulario,
                celulares: nuevosCelulares
            });
        }
    };

    // Función para actualizar un número de celular específico
    const actualizarCelular = (index, valor) => {
        const nuevosCelulares = [...celularesFormulario];
        nuevosCelulares[index] = valor;
        setFormulario({
            ...formulario,
            celulares: nuevosCelulares
        });
    };

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
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        value={formulario.nombre}
                        onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido Paterno"
                        value={formulario.apellido_paterno}
                        onChange={(e) => setFormulario({ ...formulario, apellido_paterno: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido Materno"
                        value={formulario.apellido_materno}
                        onChange={(e) => setFormulario({ ...formulario, apellido_materno: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cargo"
                        value={formulario.cargo}
                        onChange={(e) => setFormulario({ ...formulario, cargo: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select
                        value={formulario.cliente || ""}
                        onChange={(e) => setFormulario({ ...formulario, cliente: e.target.value === "" ? null : Number(e.target.value) })}
                    >
                        <option value="">Seleccione</option>
                        {clientes?.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.razon_social}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Sección de celulares */}
                <Form.Group>
                    <Form.Label>Celulares</Form.Label>
                    {celularesFormulario.map((celular, index) => (
                        <InputGroup key={index} className="mb-2">
                            <Form.Control
                                type="tel"
                                placeholder="Número de celular (9 dígitos)"
                                value={String(celular || "")}
                                onChange={(e) => actualizarCelular(index, e.target.value)}
                                pattern="[0-9]{9}"
                                maxLength="9"
                            />
                            <Button
                                variant="outline-danger"
                                onClick={() => eliminarCampoCelular(index)}
                                disabled={celularesFormulario.length <= 1}
                            >
                                ×
                            </Button>
                        </InputGroup>
                    ))}
                    <Button
                        variant="outline-primary"
                        onClick={agregarCampoCelular}
                        size="sm"
                    >
                        + Agregar otro celular
                    </Button>
                </Form.Group>
            </Form>
        </BaseModal>
    )
}