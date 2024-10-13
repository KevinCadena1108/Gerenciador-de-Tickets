import { useContext, createContext, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(cookies.get('_auth') || '');
  const [isAdmin, setIsAdmin] = useState(cookies.get('_admin') || false);

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

  return <AuthContext.Provider value={{ token, isAdmin, updateToken, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
