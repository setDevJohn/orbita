import { Accounts } from '@pages/Accounts';
import { Cards } from '@pages/Cards';
import { Categories } from '@pages/Categories';
import { Home } from '@pages/Home';
import { NaviGation } from '@pages/Navigation';
import { Notifications } from '@pages/Notifications';
import { Profile } from '@pages/Profile';
import { Register } from '@pages/Register';
import { Settings } from '@pages/Settings';
import { Login, RegisterUser, ResetPassword } from '@pages/Users';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/inicio' />} />

        <Route path='/login' element={<Login />} />
        <Route path='/registrar' element={<RegisterUser />} />
        <Route path='/recuperar-senha' element={<ResetPassword />} />

        <Route path='/' element={<NaviGation />}>
          <Route index path='/inicio' element={<Home />} />
          <Route path='/inicio/registro/:type' element={<Register />} />
          <Route path='/perfil' element={<Profile /> } />
          <Route path='/contas' element={<Accounts /> } />
          <Route path='/cartoes' element={<Cards /> } />
          <Route path='/categorias' element={<Categories /> } />
          <Route path='/notificacoes' element={<Notifications /> } />
          <Route path='/configuracoes' element={<Settings /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};