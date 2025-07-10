import { ReactNode } from 'react';

export interface HomeProviderProps  { 
  children: ReactNode
}

export interface IHomeContext {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  monthIndex: number | null,
  setMonthIndex: React.Dispatch<React.SetStateAction<number | null>>,
  accontToggle: boolean,
  setAccontToggle: React.Dispatch<React.SetStateAction<boolean>>,
  selectedAccountId: number,
  setSelectedAccountId: React.Dispatch<React.SetStateAction<number>>,
  showPrice: boolean,
  setShowPrice: React.Dispatch<React.SetStateAction<boolean>>,
  menuRegister: boolean,
  setMenuRegister: React.Dispatch<React.SetStateAction<boolean>>,
  currentPage: 'home' | 'extract' | 'projection',
  setCurrentPage: React.Dispatch<React.SetStateAction<'home' | 'extract' | 'projection'>>
}