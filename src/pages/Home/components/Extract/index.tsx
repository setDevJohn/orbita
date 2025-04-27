import { ExtractList } from 'components/Extract/List';
import { SearchFilter, DateFilter } from 'components/Inputs'; 
import { useState } from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { FaArrowTrendDown } from 'react-icons/fa6';
import { Title } from 'styles/main';

import { extractDateList } from './list';
import { 
  ButtonFilter,
  FilterContainer,
  ButtonContainer,
} from './styles';

export function ExtractComponent() {
  const [typeListFilter, setTypeListFilter] = useState<string>('');

  function handleChangeTypeList(type: string) {
    setTypeListFilter(prev => prev === type ? '' : type);
  }

  return (
    <>
      <Title>Extrato</Title>

      <FilterContainer>
        <SearchFilter />  
        <DateFilter />
      </FilterContainer>

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

      <ExtractList list={extractDateList} />
    </>
  );
}