import { TransactionIcon } from '@components/TransactionIcon';
import { mask } from '@utils/mask';
import { Dispatch, SetStateAction } from 'react';

import { ButtonContainer, ButtonFilter } from './styles';

interface StatisticButtonsProps {
  statistics: Record<string, string>;
  stateValue: string;
  setStateValue: Dispatch<SetStateAction<string>>;
}

export function StatisticButtons ({ statistics, stateValue, setStateValue }: StatisticButtonsProps) {

  function handleChangeTypeList(type: string) {
    setStateValue(prev => prev === type ? '' : type);
  }

  return (
    <ButtonContainer>
      <ButtonFilter
        type="button"
        $operationType='income'
        $select={stateValue === 'income'}
        onClick={() => handleChangeTypeList('income')}
      >
        <TransactionIcon type="income" />
        {mask.brlCurrency(statistics?.income ? statistics.income : '0')}
      </ButtonFilter>

      <ButtonFilter 
        type="button"
        $operationType='expense'
        $select={stateValue === 'expense'}
        onClick={() => handleChangeTypeList('expense')}
      >
        <TransactionIcon type="expense" />
        {mask.brlCurrency(statistics?.expense ? statistics.expense : '0')}
      </ButtonFilter>
    </ButtonContainer>
  );
}