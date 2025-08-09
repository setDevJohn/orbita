import { Accounts } from '@pages/Accounts';
import { Cards } from '@pages/Cards';
import { Categories } from '@pages/Categories';
import { Home } from '@pages/Home';
import { Navigation } from '@pages/Navigation';
import { Notifications } from '@pages/Notifications';
import { Profile } from '@pages/Profile';
import { Register } from '@pages/Register';
import { Settings } from '@pages/Settings';
import { Login, RegisterUser, ResetPassword } from '@pages/Users';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  const [authenticated, setAuthenticated] = useState(true);

  setAuthenticated(true);
  const routes = {
    publics: [
      { path: '/login', element: <Login /> },
      { path: '/registrar', element: <RegisterUser /> },
      { path: '/recuperar-senha', element: <ResetPassword /> },
    ],
    privates: [
      { path: '/inicio', element: <Home /> },
      { path: '/inicio/registro/:type', element: <Register /> },
      { path: '/perfil', element: <Profile /> },
      { path: '/contas', element: <Accounts /> },
      { path: '/cartoes', element: <Cards /> },
      { path: '/categorias', element: <Categories /> },
      { path: '/notificacoes', element: <Notifications /> },
      { path: '/configuracoes' , element: <Settings /> },
    ]
  };

  return (
    <BrowserRouter>
      <Routes>
        { !authenticated ? (
          <>
            <Route path='/' element={ <Navigate to='/login' /> } />

            {routes.publics.map(({ path, element }, i) => (
              <Route key={i} path={ path } element={ element } />
            ))}

            <Route path='*' element={ <Navigate to='/login' /> } />
          </>
        ) : (
          <>
            <Route path='/' element={ <Navigate to='/inicio' /> } />

            <Route path='/' element={ <Navigation /> }>
              {routes.privates.map(({ path, element }, i) => (
                <Route key={i} index={ i === 0 } path={ path } element={ element } />
              ))}
            </Route>

            <Route path='*' element={ <Navigate to='/inicio' /> } />
          </>
        ) }
      </Routes>
    </BrowserRouter>
  );
};

//  <Route path='/' element={<Navigate to='/inicio' />} />

//   <Route path='/login' element={<Login />} />
//   <Route path='/registrar' element={<RegisterUser />} />
//   <Route path='/recuperar-senha' element={<ResetPassword />} />

//   <Route path='/' element={<NaviGation />}>
//     <Route index path='/inicio' element={<Home />} />
//     <Route path='/inicio/registro/:type' element={<Register />} />
//     <Route path='/perfil' element={<Profile /> } />
//     <Route path='/contas' element={<Accounts /> } />
//     <Route path='/cartoes' element={<Cards /> } />
//     <Route path='/categorias' element={<Categories /> } />
//     <Route path='/notificacoes' element={<Notifications /> } />
//     <Route path='/configuracoes' element={<Settings /> } />
//   </Route>
