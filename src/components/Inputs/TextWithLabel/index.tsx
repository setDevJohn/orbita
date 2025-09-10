import { InputLabel } from 'styles/main';

import { DefaultInput } from '../Default';

import { InputContainer } from './styles';

interface ITextWithLabel {
  name: string;
  label: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  type?: string;
  required?: boolean
  autoComplete?: string;
  placeholder?: string;
  labelInColumn?: boolean
}

export function TextInputWithLabel({ 
  name,
  label,
  labelInColumn,
  ...rest
}: ITextWithLabel) {
  return (
    <InputContainer $labelInColumn={labelInColumn}>
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <DefaultInput name={name} width={'100%'} {...rest}/>
    </InputContainer>
  );
}