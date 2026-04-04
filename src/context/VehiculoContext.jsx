import { createContext, useEffect, useState, useContext } from "react";
import { VehiculoService } from "@/service/VehiculoService";

const Vehiculocontext = createContext();

export function VehiculosProvider({ children }) {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        cargarVehiculos();
    }, []);

    const cargarVehiculos = async () => {
        const { data } = await VehiculoService.getAll();
        setVehiculos(data);
    };

    return (
        <Vehiculocontext.Provider value={{ vehiculos, cargarVehiculos }}>
            {children}
        </Vehiculocontext.Provider>
    );
}

export function useVehiculos() {
    return useContext(Vehiculocontext);
}