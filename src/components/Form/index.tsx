import { BasicButton } from '@components/Buttons';
import { SelectInput, TextInputWithLabel } from '@components/Inputs';

import { FormContainer, FormStyled, FormTitle } from './styles';

export type FieldsProps = {
  type: 'default' | 'select' | 'date';
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  label: string;
  placeholder?: string;
  labelInColumn?: boolean;
  options?: { label: string; value: string }[];
}

interface IForm {
  onSubmit: () => void;
  fields: FieldsProps[];
  title?: string;
}

export function Form({ title, onSubmit, fields }: IForm) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContainer>
      {title && <FormTitle>{title}</FormTitle>}
      
      <FormStyled onSubmit={handleSubmit}>
        {fields.map((input, i) => {
          if (input.type === 'default') {
            return (
              <TextInputWithLabel
                key={i}
                name={input.name}
                value={input.value}
                handleChange={input.handleChange}
                label={input.label}
                placeholder={input.placeholder || ''}
                labelInColumn={input.labelInColumn}
              />
            );
          } else if (input.type === 'select') {
            return (
              <SelectInput
                key={i}
                name={input.name}
                label={input.label}
                value={input.value}
                options={input.options || []}
                handleChange={input.handleChange}
                placeholder={input.placeholder || ''}
                labelInColumn={input.labelInColumn}
              />
            );
          } else {
            return null;
          }
        })}

        <BasicButton text='Salvar' custonStyle={{ width: '80%', margin: '0 auto' }} />
      </FormStyled>
    </FormContainer>
  );  
}