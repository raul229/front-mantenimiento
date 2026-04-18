import { useEffect, useState, useCallback} from "react";

export function useCrud(service) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    const response = await service.getAll();
    setData(response.data);
    setLoading(false);
  }, [service])

  const crear = async (nuevo) => {
    await service.create(nuevo);
    cargarDatos();
  };

  const actualizar = async (id, actualizado) => {
    await service.update(id, actualizado);
    cargarDatos();
  };

  const eliminar = async (id) => {
    await service.remove(id);
    cargarDatos();
  };

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return { data, loading, crear, actualizar, eliminar, cargarDatos };
}
