import { Home } from '@pages/Home';
import { NaviGation } from '@pages/Navigation';
import { Register } from '@pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/inicio' />} />

        <Route path='/' element={<NaviGation />}>
          <Route index path='/inicio' element={<Home />} />
          <Route path='/inicio/registro/:type' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};