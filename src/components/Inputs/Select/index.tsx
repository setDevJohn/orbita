import { InputContainer, Label, Option, SelectStyled } from './styles';

interface ISelectInput {
  name: string;
  label: string;
  value: string;
  options: { label: string, value: string }[];
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
      <Label htmlFor={name}>{label}</Label>

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