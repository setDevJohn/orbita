import { InputLabel } from 'styles/main';

import { DefaultInput } from '../Default';

import { InputContainer } from './styles';

interface ITextWithLabel {
  name: string;
  label: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  placeholder?: string;
}

export function TextInputWithLabel({ name, value, label, handleChange, placeholder }: ITextWithLabel) {
  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <DefaultInput 
        name={name}
        type='text'
        value={value}
        handleChange={handleChange}
        placeholder={placeholder}
      />
    </InputContainer>
  );
}