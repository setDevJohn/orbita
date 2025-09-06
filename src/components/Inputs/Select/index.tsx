import { InputLabel } from 'styles/main';

import { InputContainer, Option, SelectStyled } from './styles';

export interface IOption {
  label: string;
  value: string;
}

interface ISelectInput {
  name: string;
  value: string;
  options: IOption[];
  handleChange: (name: string, value: string) => void;
  label?: string;
  minWidth?: string;
  minSelectWidth?: string;
  placeholder?: string;
  labelInColumn?: boolean;
  darkBackground?: boolean;
}

export function SelectInput({ 
  name,
  value,
  options,
  handleChange,
  label,
  minWidth,
  minSelectWidth,
  placeholder,
  labelInColumn,
  darkBackground,
}: ISelectInput ){
  return (
    <InputContainer $labelInColumn={labelInColumn}>
      {label && <InputLabel $minWidth={minWidth} htmlFor={name}>{label}</InputLabel>}
      <SelectStyled 
        name={name}
        value={value || ''}
        $minWidth={minSelectWidth}
        onChange={({ target :{ value, name } }) => handleChange(name, value)}
        $darkBackground={darkBackground}
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