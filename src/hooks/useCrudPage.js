import { useCrud } from "./useCrud";
import { useForm } from "./useForm";
import { useModal } from "./useModal";
import toast from "react-hot-toast";

export function useCrudPage({ service, formularioInicial, actulizacionDatosSecundarios }) {
    const { data, loading, crear, actualizar, eliminar: eliminarRegistro } = useCrud(service);
    const { show, ocultarModal, mostrarModal } = useModal();
    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial });
    const eliminar = async (id) => {
        try {
            await eliminarRegistro(id);
            toast.success("Registro eliminado correctamente");
            // Refrescar datos secundarios si se proporciona callback
            if (typeof actulizacionDatosSecundarios === 'function') {
                actulizacionDatosSecundarios();
            }
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
            
            // Refrescar datos secundarios si se proporciona callback
            if (typeof actulizacionDatosSecundarios === 'function') {
                actulizacionDatosSecundarios();
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