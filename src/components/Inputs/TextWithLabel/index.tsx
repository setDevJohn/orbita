import { InputContainer, Label, TextInput } from './styles';

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
      <Label htmlFor={name}>{label}</Label>

      <TextInput 
        id={name}
        type='text'
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={({ target :{ value, name } }) => handleChange(name, value)}
      />
    </InputContainer>
  );
}