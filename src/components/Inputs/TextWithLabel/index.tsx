import { InputLabel } from 'styles/main';

import { DefaultInput } from '../Default';

import { InputContainer } from './styles';

interface ITextWithLabel {
  name: string;
  label: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  placeholder?: string;
  labelInColumn?: boolean
}

export function TextInputWithLabel({ 
  name,
  value, 
  label,
  handleChange, 
  placeholder,
  labelInColumn
}: ITextWithLabel) {
  return (
    <InputContainer $labelInColumn={labelInColumn}>
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <DefaultInput 
        name={name}
        type='text'
        value={value}
        width={'100%'}
        handleChange={handleChange}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}