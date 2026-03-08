export const guardarEntidad = async ({ editando, formulario, create, update, recargarDatos, ocultarModal }) => {
  if (editando) {
    await update(formulario.id, formulario);
  } else {
    await create(formulario);
  }
  ocultarModal();
  recargarDatos();
};