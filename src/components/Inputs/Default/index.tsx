import { TextInput } from './styles';

interface ITextWithLabel {
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  type?: string
  width?: string
  placeholder?: string;
}

export function DefaultInput({ name, value, handleChange, type, width, placeholder }: ITextWithLabel) {
  return (
    <TextInput 
      id={name}
      type={type || 'text'}
      name={name}
      value={value}
      $width={width}
      placeholder={placeholder}
      onChange={({ target :{ value, name } }) => handleChange(name, value)}
    />
  );
}