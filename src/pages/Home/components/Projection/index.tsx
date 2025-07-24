import { ExtractList } from '@components/Extract/List';
import { DateInput, DefaultInput } from '@components/Inputs';
import { HomeContext } from '@context/Home';
import { transactionsApi } from '@services/transactions';
import { TransactionRaw } from '@services/transactions/interfaces';
import { toastError } from '@utils/toast';
import { useContext, useEffect, useState } from 'react';
import { Title } from 'styles/main';

import { StatisticButtons } from '../StatisticButtons';

import { FilterContainer } from './styles';

export interface IFilters {
  description: string;
  date: Date | null;
}

export function ProjectionComponent () {
  const [filters, setFilters] = useState<IFilters>({ description: '', date: null });
  const [transactions, setTransactions] = useState<TransactionRaw[]>([]);

  const { monthIndex, setLoading } = useContext(HomeContext);

  useEffect(() => {
    async function fetchData() {
      if (monthIndex === null) { return; } 
      setLoading(true);
      
      try {
        const transactionResponse = await transactionsApi.get(1, `&month=${monthIndex + 1}`);
        
        setTransactions(transactionResponse);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [monthIndex, setLoading]);  

  const handleChange = (name: string, value: string | Date) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <FilterContainer>
        <DefaultInput 
          name='description'
          placeholder='Descrição'
          value={filters.description}
          handleChange={handleChange}
        />
      
        <DateInput
          startDate={filters.date}
          handleChange={(date) => handleChange('date', date as Date)}
          placeholder='dd / mm / aaaa'
        />
      </FilterContainer>
    
      <StatisticButtons />

      <Title>Próximas Projeções</Title>
    
      <ExtractList list={transactions} />
    </>
  );
}