import { useCrud } from "./useCrud";
import { useForm } from "./useForm";
import { useModal } from "./useModal";

export function useCrudPage({ service, formularioInicial }) {
    const { data, loading, crear, actualizar, eliminar } = useCrud(service);
    const { show, ocultarModal, mostrarModal } = useModal();
    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial });
    const guardar = async () => {
        try {
            if (editando) {
                await actualizar(formulario.id, formulario);
            } else {
                await crear(formulario);
            }
            limpiarFormulario();
            ocultarModal();
        } catch (error) {
            console.error("Hubo un error al guardar", error);
        }
    }
    return {
        data,
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
    }
}