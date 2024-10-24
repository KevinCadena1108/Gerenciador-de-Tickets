import { useContext, createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const cookies = new Cookies();
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(cookies.get('_auth') || '');
  const [isAdmin, setIsAdmin] = useState(cookies.get('_admin') || false);
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    setCpf(decodedToken.cpf);
  }, [token]);

  const updateToken = async (token, isAdmin) => {
    const cookiesConfig = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      domain: window.location.hostname,
      path: '/',
    };

    setToken(token);
    setIsAdmin(isAdmin);
    cookies.set('_auth', token, cookiesConfig);
    cookies.set('_admin', isAdmin, cookiesConfig);
  };

  const logOut = () => {
    setToken('');
    setIsAdmin(false);
    cookies.remove('_auth');
    cookies.remove('_admin');
  };

  return <AuthContext.Provider value={{ token, isAdmin, cpf, updateToken, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
