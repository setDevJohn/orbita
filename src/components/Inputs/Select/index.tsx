import { InputLabel } from 'styles/main';

import { InputContainer, Option, SelectStyled } from './styles';

export interface IOption {
  label: string;
  value: string;
}

interface ISelectInput {
  name: string;
  label: string;
  value: string;
  options: IOption[];
  handleChange: (name: string, value: string) => void;
  placeholder?: string;
}

export function SelectInput({ 
  name,
  label,
  value,
  options,
  handleChange,
  placeholder
}: ISelectInput ){
  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <SelectStyled
        name={name} 
        value={value || ''}
        onChange={({ target :{ value, name } }) => handleChange(name, value)}
      >
        {placeholder && <Option value="">{placeholder}</Option>}

        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </Option>
        ))} 
      </SelectStyled>
    </InputContainer>
  );
}