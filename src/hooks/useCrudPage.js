import { useCrud } from "./useCrud";
import { useForm } from "./useForm";
import { useModal } from "./useModal";
import toast from "react-hot-toast";

export function useCrudPage({ service, formularioInicial }) {
    const { data, loading, crear, actualizar, eliminar: eliminarRegistro } = useCrud(service);
    const { show, ocultarModal, mostrarModal } = useModal();
    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial });
    const eliminar =  (id) => {
        try {
            eliminarRegistro(id);
            toast.success("Registro eliminado correctamente");
        } catch (error) {
            console.log(error);
            toast.error("Hubo un error al eliminar", error);
        }
    }
    const guardar = async () => {
        try {
            if (editando) {
                await actualizar(formulario.id, formulario);
                toast.success("Registro actualizado correctamente");
            } else {
                await crear(formulario);
                toast.success("Registro creado correctamente");
            }
            limpiarFormulario();
            ocultarModal();
        } catch (error) {
            console.error("Hubo un error al guardar", error);
            toast.error("Hubo un error al guardar", error);
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