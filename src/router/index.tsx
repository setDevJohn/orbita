import { Home } from '@pages/Home';
import { NaviGation } from '@pages/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NaviGation />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};