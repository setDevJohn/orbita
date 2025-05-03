/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import './styles.css';

export type Mode = 'day' | 'week' | 'month' | 'year';

interface IDateInput {
  handleChange: (date: Date | [Date | null, Date | null]) => void;
  placeholder: string;
  startDate: Date | null;
  endDate?: Date | null;
  isRange?: boolean;
  mode?: Mode;
}

export function DateInput({
  startDate,
  endDate,
  handleChange,
  placeholder,
  isRange = false,
  mode = 'day',
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
    <DatePicker
      {...({
        className: 'custom-date-picker',
        selected: startDate,
        onChange: handleChange,
        startDate: isRange ? startDate : undefined,
        endDate: isRange ? endDate : undefined,
        selectsRange: isRange ? true : undefined,
        placeholderText: placeholder,
        dateFormat: dateFormat,
        locale: ptBR,
        ...showPickerProps,
      } as any)}
    />
  );
}