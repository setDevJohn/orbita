import { createContext, useMemo, useState } from 'react';

import { HomeProviderProps, IHomeContext, TokenData } from './interface';

const HomeContext = createContext<IHomeContext>({
  decodedUser: null,
  setDecodedUser: () => {},
  loading: false,
  setLoading: () => {},
  monthIndex: null,
  setMonthIndex: () => {},
  year: null,
  setYear: () => {},
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
  const [decodedUser, setDecodedUser] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [monthIndex, setMonthIndex] = useState<number | null>(null);
  const [year, setYear] = useState<Date | null>(null);
  const [customDateFilter, setCustomDateFilter] = useState<Date | null>(null);
  const [accontToggle, setAccontToggle] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(0);
  const [menuRegister, setMenuRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'extract' | 'projection'>('home');

  const homeValue = useMemo(() => ({
    decodedUser,
    setDecodedUser,
    loading,
    setLoading,
    monthIndex,
    setMonthIndex,
    year,
    setYear,
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
    decodedUser,
    accontToggle,
    currentPage,
    loading,
    menuRegister,
    monthIndex,
    year,
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