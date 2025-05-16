/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import './styles.css';
import { InputLabel } from 'styles/main';

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
}

export function DateInput({
  handleChange,
  startDate,
  endDate,
  placeholder,
  isRange = false,
  mode = 'day',
  label = ''
}: IDateInput) {
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
    <DateContainer>
      <InputLabel>{label}</InputLabel>

      <DatePicker
        {...({
          className: 'custom-date-picker',
          selected: startDate,
          onChange: handleChange,
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