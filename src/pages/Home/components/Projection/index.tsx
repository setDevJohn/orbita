import { ExtractList } from '@components/Extract/List';
import { DateInput, DefaultInput } from '@components/Inputs';
import { useState } from 'react';
import { Title } from 'styles/main';

import { StatisticButtons } from '../StatisticButtons';

import { projectionDateList } from './list';
import { FilterContainer } from './styles';

export interface IFilters {
  description: string;
  date: Date | null;
}

export function ProjectionComponent () {
  const [filters, setFilters] = useState<IFilters>({ description: '', date: null });

  const handleChange = (name: string, value: string | Date) => {
    setFilters({ ...filters, [name]: value });
  };
  return (
    <>
      <Title>Projeções</Title>

      <FilterContainer>
        <DefaultInput 
          name='description'
          placeholder='Descrição'
          value={filters.description}
          handleChange={handleChange}
          width='80%'
        />
      
        <DateInput
          startDate={filters.date}
          handleChange={(date) => handleChange('date', date as Date)}
          placeholder='dd / mm / aaaa'
        />
      </FilterContainer>
    
      <StatisticButtons />
    
      <ExtractList list={projectionDateList} />
    </>
  );
}