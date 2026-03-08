import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./page/HomePage";
import { MantenimientoPage } from "./page/MantenimientoPage";
import { FallaPage } from "./page/FallaPage";
import { VehiculosProvider } from "./context/VehiculoContext";
import { VehiculoPage } from "./page/VehiculoPage";

function App() {
  return (
    <VehiculosProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mantenimientos" element={<MantenimientoPage />} />
          <Route path="/fallas" element={<FallaPage />} />
          <Route path="/vehiculos" element={<VehiculoPage />} />
        </Route>
      </Routes>
    </VehiculosProvider>
  );
}

export default App;
