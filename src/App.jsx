import { Route, Routes } from "react-router-dom";
import { Layout } from "@/layout/Layout";
import { HomePage } from "@/page/mantenimiento/HomePage";
import { MantenimientoPage } from "@/page/mantenimiento/MantenimientoPage";
import { FallaPage } from "@/page/mantenimiento/FallaPage";
import { VehiculosProvider } from "@/context/VehiculoContext";
import { VehiculoPage } from "@/page/mantenimiento/VehiculoPage";
import { ClientePage } from "@/page/ruta/ClientePage";
import { SedePage } from "@/page/ruta/SedePage";
import { CiudadPage } from "@/page/ruta/CiudadPage";

function App() {
  return (
    <VehiculosProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mantenimientos" element={<MantenimientoPage />} />
          <Route path="/fallas" element={<FallaPage />} />
          <Route path="/vehiculos" element={<VehiculoPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/sedes" element={<SedePage />} />
          <Route path="/ciudades" element={<CiudadPage />} />
        </Route>
      </Routes>
    </VehiculosProvider>
  );
}

export default App;
