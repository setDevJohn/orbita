import { LoadingPage } from '@components/Loading';
import { AuthContext } from '@context/Auth';
import { Accounts } from '@pages/Accounts';
import { Cards } from '@pages/Cards';
import { Categories } from '@pages/Categories';
import { Home } from '@pages/Home';
import { Navigation } from '@pages/Navigation';
import { Notifications } from '@pages/Notifications';
import { Profile } from '@pages/Profile';
import { Register } from '@pages/Register';
import { Settings } from '@pages/Settings';
import { Login, RegisterUser } from '@pages/Users';
import { EmailStep, NewPasswordStep, TokenStep } from '@pages/Users/ResetPassword';
import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  const { authenticated, loadingAuth } = useContext(AuthContext);

  const routes = {
    publics: [
      { path: '/login', element: <Login /> },
      { path: '/registrar', element: <RegisterUser /> },
      { path: '/recuperar-senha', element: <EmailStep /> },
      { path: '/recuperar-senha/token', element: <TokenStep /> },
      { path: '/recuperar-senha/nova-senha', element: <NewPasswordStep /> },
    ],
    privates: [
      { path: '/inicio/registro/:type', element: <Register /> },
      { path: '/perfil', element: <Profile /> },
      { path: '/contas', element: <Accounts /> },
      { path: '/cartoes', element: <Cards /> },
      { path: '/categorias', element: <Categories /> },
      { path: '/notificacoes', element: <Notifications /> },
      { path: '/configuracoes' , element: <Settings /> },
    ]
  };

  if (loadingAuth) {
    return <LoadingPage backgroundColor/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to={authenticated ? '/inicio' : '/login'} /> } />

        { !authenticated ? (
          <>
            {routes.publics.map(({ path, element }, i) => (
              <Route key={i} path={path} element={element} />
            ))}
          </>
        ) : (
          <Route path="/" element={ <Navigation /> }> 
            <Route index path='/inicio' element={<Home />} />
          
            {routes.privates.map(({ path, element }, i) => (
              <Route key={i} path={path} element={element} />
            ))}
          </Route>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
