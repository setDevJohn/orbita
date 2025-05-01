import { createContext, useMemo, useState } from 'react';

import { HomeProviderProps, IHomeContext } from './interface';

const HomeContext = createContext<IHomeContext>({
  monthIndex: 0,
  setMonthIndex: () => {},
  accontToggle: false,
  setAccontToggle: () => {},
  selectedAccountId: 1,
  setSelectedAccountId: () => {},
  showPrice: false,
  setShowPrice: () => {},
  menuRegister: false,
  setMenuRegister: () => {},
  currentPage: 'home',
  setCurrentPage: () => {},
});

const HomeProvider = ({ children } : HomeProviderProps) => {
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const [accontToggle, setAccontToggle] = useState<boolean>(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [menuRegister, setMenuRegister] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'extract' | 'projection'>('home');

  const homeValue = useMemo(() => ({
    monthIndex,
    setMonthIndex,
    accontToggle,
    setAccontToggle,
    selectedAccountId,
    setSelectedAccountId,
    showPrice,
    setShowPrice,
    menuRegister,
    setMenuRegister,
    currentPage,
    setCurrentPage
  }), [accontToggle, currentPage, menuRegister, monthIndex, selectedAccountId, showPrice]);

  return (
    <HomeContext.Provider value={homeValue}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };