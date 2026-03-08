export const guardarEntidad =  async  ({editando, formulario, create, update, regargarDatos, ocultarModal}) => {
    if (editando) {
    await update(formulario.id, formulario);
    } else {
      await create(formulario);
    }
    ocultarModal();
    regargarDatos();
  };