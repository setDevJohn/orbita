import { TextInput } from './styles';

interface ITextWithLabel {
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  type?: string
  size?: string
  width?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string;
}

export function DefaultInput({ 
  name,
  value,
  handleChange,
  type,
  size,
  width,
  required,
  autoComplete,
  placeholder
}: ITextWithLabel) {
  return (
    <TextInput 
      id={name}
      type={type || 'text'}
      name={name}
      value={value}
      $size={size}
      $width={width}
      required={!!required}
      placeholder={placeholder}
      autoComplete={autoComplete || ''}
      onChange={({ target :{ value, name } }) => handleChange(name, value)}
    />
  );
}