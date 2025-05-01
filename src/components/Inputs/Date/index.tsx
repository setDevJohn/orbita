import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import './styles.css';

interface IDateInput {
  startDate: Date | null
  handleChange: (date: Date | null) => void;
  placeholder: string;
}

export function DateInput({ startDate, handleChange, placeholder }: IDateInput) {
  return (
    <DatePicker
      className="custom-date-picker"
      selected={startDate}
      onChange={(date) => handleChange(date)}
      placeholderText={placeholder}
      dateFormat="dd/MM/yyyy"
      locale={ptBR}
    />
  );
}