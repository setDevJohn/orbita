import { useState } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

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
        $select={typeListFilter === 'revenue'}
        onClick={() => handleChangeTypeList('revenue')}
      >
        <FaArrowTrendUp size={22} fill="#0f0" />
          R$ 50,49
      </ButtonFilter>

      <ButtonFilter 
        type="button"
        $select={typeListFilter === 'expense'}
        onClick={() => handleChangeTypeList('expense')}
      >
        <FaArrowTrendDown size={22} fill="#f00" />
          R$ 50,49
      </ButtonFilter>
    </ButtonContainer>
  );
}