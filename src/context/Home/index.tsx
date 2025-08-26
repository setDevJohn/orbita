import { createContext, useMemo, useState } from 'react';

import { HomeProviderProps, IHomeContext } from './interface';

const HomeContext = createContext<IHomeContext>({
  loading: false,
  setLoading: () => {},
  monthIndex: null,
  setMonthIndex: () => {},
  customDateFilter: null,
  setCustomDateFilter: () => {}, 
  accontToggle: false,
  setAccontToggle: () => {},
  selectedAccountId: 0,
  setSelectedAccountId: () => {},
  menuRegister: false,
  setMenuRegister: () => {},
  currentPage: 'home',
  setCurrentPage: () => {},
});

const HomeProvider = ({ children } : HomeProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [monthIndex, setMonthIndex] = useState<number | null>(null);
  const [customDateFilter, setCustomDateFilter] = useState<Date | null>(null);
  const [accontToggle, setAccontToggle] = useState<boolean>(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(0);
  const [menuRegister, setMenuRegister] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'extract' | 'projection'>('home');

  const homeValue = useMemo(() => ({
    loading,
    setLoading,
    monthIndex,
    setMonthIndex,
    customDateFilter,
    setCustomDateFilter,
    accontToggle,
    setAccontToggle,
    selectedAccountId,
    setSelectedAccountId,
    menuRegister,
    setMenuRegister,
    currentPage,
    setCurrentPage
  }), [
    accontToggle,
    currentPage,
    loading,
    menuRegister,
    monthIndex,
    selectedAccountId,
    customDateFilter
  ]);

  return (
    <HomeContext.Provider value={homeValue}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };