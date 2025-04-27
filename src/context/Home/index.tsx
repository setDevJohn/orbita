import { createContext, ReactNode } from 'react';

const HomeContext = createContext<{}>({
});

interface HomeProviderProps  { 
  children: ReactNode
}

// Achar novo nome 
const HomeProvider = ({ children } : HomeProviderProps) => {

  return (
    <HomeContext.Provider value={{  }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };