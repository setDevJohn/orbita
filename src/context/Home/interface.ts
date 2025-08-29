import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface TokenData {
  id: number,
  email: string,
  verified: boolean,
  name: string,
  profileImage: string,
  iat: number,
  exp: number
}

export interface HomeProviderProps  { 
  children: ReactNode
}

export interface IHomeContext {
  decodedUser: TokenData | null,
  setDecodedUser: Dispatch<SetStateAction<TokenData | null>>
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  monthIndex: number | null,
  setMonthIndex: Dispatch<SetStateAction<number | null>>,
  year: Date | null,
  setYear: Dispatch<SetStateAction<Date | null>>
  customDateFilter: Date |null,
  setCustomDateFilter: Dispatch<SetStateAction<Date | null>>,
  accontToggle: boolean,
  setAccontToggle: Dispatch<SetStateAction<boolean>>,
  selectedAccountId: number,
  setSelectedAccountId: Dispatch<SetStateAction<number>>,
  menuRegister: boolean,
  setMenuRegister: Dispatch<SetStateAction<boolean>>,
  currentPage: 'home' | 'extract' | 'projection',
  setCurrentPage: Dispatch<SetStateAction<'home' | 'extract' | 'projection'>>
}