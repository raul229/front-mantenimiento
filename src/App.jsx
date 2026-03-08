import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./page/HomePage";
import { MantenimientoPage } from "./page/MantenimientoPage";
import { FallaPage } from "./page/FallaPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/mantenimientos" element={<MantenimientoPage />} />
        <Route path="/fallas" element={<FallaPage />} />
      </Route>
    </Routes>
  );
}

export default App;
