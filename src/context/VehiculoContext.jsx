import { createContext, useEffect, useState, useContext } from "react";
import { getVehiculos } from "../service/VehiculoService";

const Vehiculocontext = createContext();

export function VehiculosProvider({ children }) {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        cargarVehiculos();
    }, []);

    const cargarVehiculos = async () => {
        const { data } = await getVehiculos();
        setVehiculos(data);
    };

    return (
        <Vehiculocontext.Provider value={{ vehiculos }}>
            {children}
        </Vehiculocontext.Provider>
    );
}

export function useVehiculos() {
    return useContext(Vehiculocontext);
}