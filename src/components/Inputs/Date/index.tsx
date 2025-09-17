/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeContext } from '@context/Theme';
import { mask } from '@utils/mask';
import { ptBR } from 'date-fns/locale';
import { FormEvent, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { InputLabel } from 'styles/main';
import './styles.css';

import { DateContainer } from './styles';

export type Mode = 'day' | 'week' | 'month' | 'year';

interface IDateInput {
  handleChange: (date: Date | [Date | null, Date | null]) => void;
  startDate: Date | null;
  endDate?: Date | null;
  placeholder?: string;
  isRange?: boolean;
  mode?: Mode;
  label?: string
  labelInColumn?: boolean
}

export function DateInput({
  handleChange,
  startDate,
  endDate,
  placeholder,
  isRange = false,
  mode = 'day',
  label,
  labelInColumn,
}: IDateInput) {
  const { theme } = useContext(ThemeContext);

  const showPickerProps = {
    showWeekNumbers: mode === 'week',
    showMonthYearPicker: mode === 'month',
    showYearPicker: mode === 'year',
  };

  const dateFormat = 
    mode === 'year'
      ? 'yyyy'
      : mode === 'month'
        ? 'MM/yyyy'
        : mode === 'week'
          ? '\'Semana\' w'
          : 'dd/MM/yyyy';

  return (
    <DateContainer $labelInColumn={labelInColumn}>
      {label && <InputLabel>{label}</InputLabel> }

      <DatePicker
        {...({
          className: `custom-date-picker ${theme.type === 'dark' ? 'dark' : 'light'}`,
          selected: startDate,
          onChange: handleChange,
          onChangeRaw: (e: FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'input') {
              const input = target as HTMLInputElement;
              input.value = mask.date(input.value);
            }
          },
          startDate: isRange ? startDate : undefined,
          endDate: isRange ? endDate : undefined,
          selectsRange: isRange ? true : undefined,
          placeholderText: placeholder || '',
          dateFormat: dateFormat,
          locale: ptBR,
          ...showPickerProps,
        } as any)}
      />
    </DateContainer>
  );
}