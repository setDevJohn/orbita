import { BasicButton } from '@components/Buttons';
import { SelectInput, TextInputWithLabel } from '@components/Inputs';
import { Separator } from 'styles/main';

import { ButtonsContainer, FormContainer, FormStyled, FormTitle } from './styles';

export type FieldsProps = {
  type: 'default' | 'select' | 'date';
  name: string;
  value: string;
  handleChange: (name: string, value: string) => void;
  label: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  labelInColumn?: boolean;
  inputType?: 'email' | 'text' | 'password',
  options?: { label: string; value: string }[];
}

interface IForm {
  onSubmit: () => void;
  fields: FieldsProps[];
  title?: string;
  cancelFunction?: () => void;
  marginBottom?: number;
  confirmText?: string;
  separator?: boolean
}

export function Form({ 
  onSubmit,
  fields,
  title,
  cancelFunction,
  marginBottom,
  confirmText,
  separator
}: IForm) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return ( 
    <FormContainer $marginBottom={marginBottom}>
      {title && <FormTitle>{title}</FormTitle>}

      <FormStyled onSubmit={handleSubmit}>
        {fields.map(({ type, inputType, options, ...inputProps }, i) => {
          if (type === 'default') {
            return (
              <TextInputWithLabel
                key={i}
                type={inputType || 'text'}
                { ...inputProps }
              />
            );
          } else if (type === 'select') {
            return (
              <SelectInput
                key={i}
                options={options || []}
                { ...inputProps }
              />
            );
          } else {
            return null;
          }
        })}

        <ButtonsContainer>
          { cancelFunction && (
            <BasicButton 
              type="cancel"
              text="Cancelar"
              action={cancelFunction}
              custonStyle={{ width: '70%' }}
            />
          )}
            
          <BasicButton
            text={confirmText || 'Salvar'}
            type="confirm"
            custonStyle={{ width: '70%' }}
          />
        </ButtonsContainer>

        {separator && <Separator />}
      </FormStyled>
    </FormContainer>
  );
}