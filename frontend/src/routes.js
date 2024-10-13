import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PesqCli from './pages/PesqCli';
import CadAluno from './pages/CadAluno';
import EdiCli from './pages/EditCli';
import { useAuth } from './components/Auth/AuthProvider';
import axios from 'axios';
import PrivateRoute from './components/Auth/PrivateRoute';
import AdminRoute from './components/Auth/AdminRoute';
import RedirectRoute from './components/Auth/RedirectRoute';

function AppRoutes() {
  const auth = useAuth();

  if (auth.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RedirectRoute />}>
          <Route path="/" element={<Login />}></Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/editcli" element={<EdiCli />}></Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/cadaluno" element={<CadAluno />}></Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/pesqcli" element={<PesqCli />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
