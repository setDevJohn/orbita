import { TextInput } from './styles';

interface ITextWithLabel {
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  type?: string
  placeholder?: string;
}

export function DefaultInput({ name, value, handleChange, type, placeholder }: ITextWithLabel) {
  return (
    <TextInput 
      id={name}
      type={type || 'text'}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={({ target :{ value, name } }) => handleChange(name, value)}
    />
  );
}