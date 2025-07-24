import { TransactionIcon } from '@components/TransactionIcon';
import { useState } from 'react';

import { ButtonContainer, ButtonFilter } from './styles';

export function StatisticButtons () {
  const [typeListFilter, setTypeListFilter] = useState<string>('');

  function handleChangeTypeList(type: string) {
    setTypeListFilter(prev => prev === type ? '' : type);
  }

  return (
    <ButtonContainer>
      <ButtonFilter
        type="button"
        $operationType='income'
        $select={typeListFilter === 'income'}
        onClick={() => handleChangeTypeList('income')}
      >
        <TransactionIcon type="income" />
        R$ 50,49
      </ButtonFilter>

      <ButtonFilter 
        type="button"
        $operationType='expense'
        $select={typeListFilter === 'expense'}
        onClick={() => handleChangeTypeList('expense')}
      >
        <TransactionIcon type="expense" />
        R$ 50,49
      </ButtonFilter>
    </ButtonContainer>
  );
}