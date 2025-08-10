// src/context/AuthContext.tsx
import { api } from '@services/api';
import { usersApi } from '@services/users';
import { UserFormLogin } from '@services/users/interface';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface AuthContextProps {
  authenticated: boolean;
  loadingAuth: boolean;
  checkAuthentication: () => Promise<void>;
  login: (userData: UserFormLogin) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const checkAuthentication = useCallback(async () => {
    try {
      setLoadingAuth(true);

      await usersApi.verify();
      console.log('Verificação de autenticação bem-sucedida');
      setAuthenticated(true);
    } catch {
      console.error('Erro ao verificar autenticação');
      setAuthenticated(false);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  const login = useCallback(async (userData: UserFormLogin) => {
    await usersApi.login(userData);
    await checkAuthentication();
  }, [checkAuthentication]);

  const logout = useCallback(() => {
    api.post('/auth/logout').finally(() => {
      setAuthenticated(false);
    });
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const authValue = useMemo(() => ({
    authenticated,
    loadingAuth,
    checkAuthentication,
    login,
    logout
  }), [authenticated, loadingAuth, checkAuthentication, login, logout]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };