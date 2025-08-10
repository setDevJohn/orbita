// src/context/AuthContext.tsx
import { setupInterceptors } from '@services/api';
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
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  const login = useCallback(async (userData: UserFormLogin) => {
    await usersApi.login(userData);
    await checkAuthentication();
  }, [checkAuthentication]);

  const logout = useCallback(async () => {
    await usersApi.logout();
    setAuthenticated(false);
  }, []);

  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

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