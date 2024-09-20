import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PesqCli from "./pages/PesqCli";
import CadAluno from "./pages/CadAluno";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/pesqcli" element={<PesqCli />}></Route>
        <Route path="/cadaluno" element={<CadAluno />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
