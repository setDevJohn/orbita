import { ExtractList } from '@components/Extract/List';
import { DateFilter, SearchFilter } from '@components/Inputs';
import { Title } from 'styles/main';

import { StatisticButtons } from '../StatisticButtons';

import { projectionDateList } from './list';
import { FilterContainer } from './styles';

export function ProjectionComponent () {
  return (
    <>
      <Title>Projeções</Title>

      <FilterContainer>
        <SearchFilter />  
        <DateFilter />
      </FilterContainer>
    
      <StatisticButtons />
    
      <ExtractList list={projectionDateList} />
    </>
  );
}