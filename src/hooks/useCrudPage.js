export function useCrudPage({ service, formularioInicial }) {
    const { data, loading, crear, actualizar, eliminar } = useCrud(service);
    const { show, ocultarModal, mostrarModal } = useModal();
    const { formulario, setFormulario, limpiarFormulario, editando, setEditando } = useForm({ formularioInicial });
    const guardar = () => {
        try {
            if (editando) {
                actualizar(formulario.id, formulario);
            } else {
                crear(formulario);
            }
            limpiarFormulario();
            ocultarModal();
        } catch (error) {
            console.error("Hubo un error al guardar", error);
        }
    }
    if (loading) {
        return <div>Cargando...</div>
    }
    return {
        data,
        loading,
        crear,
        actualizar,
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