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
  const [statistics, setStatistics] = useState<Record<string, string>>({});
  const [transactionType, setTransactionType] = useState('');

  const { monthIndex, setLoading } = useContext(HomeContext);

  useEffect(() => {
    async function fetchData() {
      if (monthIndex === null) { return; } 
      setLoading(true);
      
      const query = `projection=true${!filters.date ? `&month=${monthIndex + 1}` : ''}${transactionType ? `&type=${transactionType}` : ''}${filters.description ? `&description=${filters.description}` : ''}${filters.date ? `&date=${filters.date.toJSON().split('T')[0]}` : ''}`;

      try {
        const { transactions , valuesByType } = await transactionsApi.get(1, query);
        
        setTransactions(transactions);
        setStatistics(valuesByType);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [monthIndex, transactionType, setLoading, filters.description, filters.date]);  

  const handleChange = (name: string, value: string | Date) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <>
      <FilterContainer>
        <DefaultInput 
          name='description'
          placeholder='Descrição / Categoria'
          value={filters.description}
          handleChange={handleChange}
        />
      
        <DateInput
          startDate={filters.date}
          handleChange={(date) => handleChange('date', date as Date)}
          placeholder='dd / mm / aaaa'
        />
      </FilterContainer>

      <StatisticButtons 
        statistics={statistics} 
        stateValue={transactionType}
        setStateValue={setTransactionType}
      />

      <Title>Próximas Projeções</Title>
    
      <ExtractList list={transactions} />
    </>
  );
}