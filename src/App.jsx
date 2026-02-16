import { Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { HomePage } from "./page/HomePage";
import { MantenimientoPage } from "./page/MantenimientoPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/mantenimiento" element={<MantenimientoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
