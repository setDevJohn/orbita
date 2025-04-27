import { ExtractList } from '@components/Extract/List';
import { SearchFilter, DateFilter } from '@components/Inputs'; 
import { Title } from 'styles/main';

import { StatisticButtons } from '../StatisticButtons';

import { extractDateList } from './list';
import { FilterContainer } from './styles';

export function ExtractComponent() {

  return (
    <>
      <Title>Extrato</Title>

      <FilterContainer>
        <SearchFilter />  
        <DateFilter />
      </FilterContainer>

      <StatisticButtons />

      <ExtractList list={extractDateList} />
    </>
  );
}