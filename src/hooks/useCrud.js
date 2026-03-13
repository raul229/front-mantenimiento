import { useEffect, useState } from "react";

export function useCrud(service) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarDatos = async () => {
        setLoading(true);

        const response = await service.getAll();
        setData(response.data);
        setLoading(false);
    };
 
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

    useEffect(()=>{
        cargarDatos();
    },[])
    
    return {data, loading, cargarDatos, crear, actualizar, eliminar};
    
    
}