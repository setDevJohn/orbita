import { InputLabel } from 'styles/main';

import { DefaultInput } from '../Default';

import { InputContainer } from './styles';

interface ITextWithLabel {
  name: string;
  label: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  type?: string;
  placeholder?: string;
  labelInColumn?: boolean
}

export function TextInputWithLabel({ 
  name,
  value, 
  label,
  handleChange, 
  type,
  placeholder,
  labelInColumn,
  ...rest
}: ITextWithLabel) {
  return (
    <InputContainer $labelInColumn={labelInColumn}>
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <DefaultInput 
        name={name}
        type={type || 'text'}
        value={value}
        width={'100%'}
        handleChange={handleChange}
        placeholder={placeholder}
        {...rest}
      />
    </InputContainer>
  );
}