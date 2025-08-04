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

export function ExtractComponent() {
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState<TransactionRaw[]>([]);
  const [statistics, setStatistics] = useState<Record<string, string>>({});
  const [transactionType, setTransactionType] = useState('');

  const { monthIndex, customDateFilter, setCustomDateFilter, setLoading } = useContext(HomeContext);

  useEffect(() => {
    async function fetchData() {
      if (monthIndex === null) { return; } 
      setLoading(true);
      
      const query = `extract=true${!customDateFilter ? `&month=${monthIndex + 1}` : ''}${transactionType ? `&type=${transactionType}` : ''}${description ? `&description=${description}` : ''}${customDateFilter ? `&date=${customDateFilter.toJSON().split('T')[0]}` : ''}`;

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
  }, [monthIndex, transactionType, setLoading, description, customDateFilter]);   
  
  const handleChange = (name: string, value: string | Date) => {
    if (name === 'description') {
      return setDescription(value as string);
    }
    setCustomDateFilter(value as Date);
  };

  return (
    <>
      <FilterContainer>
        <DefaultInput 
          name='description'
          placeholder='Descrição / Categoria'
          value={description}
          handleChange={handleChange}
        />

        <DateInput
          startDate={customDateFilter}
          handleChange={(date) => handleChange('date', date as Date)}
          placeholder='dd / mm / aaaa'
        />
      </FilterContainer>

      <StatisticButtons 
        statistics={statistics} 
        stateValue={transactionType}
        setStateValue={setTransactionType}
      />

      <Title>Extrato Atual</Title>

      <ExtractList list={transactions} />
    </>
  );
}