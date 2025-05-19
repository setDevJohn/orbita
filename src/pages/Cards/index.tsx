import { Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { mask } from '@utils/mask';
import { useState } from 'react';

interface IForm {
  name: string;
  limit: string;
  closingDate: string;
  dueDate: string;
}

export function Cards() {
  const [form, setForm] = useState<IForm>({
    name: '',
    limit: '0',
    closingDate: '',
    dueDate: '',
  });

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {};

  return (
    <LayoutContainer title="Cartões">
      <Form 
        title="Novo Cartão"
        onSubmit={handleSubmit}
        inputs={[
          {
            type: 'default',
            name: 'name',
            value: form.name,
            handleChange,
            label: 'Nome',
            placeholder: 'Cartão banco 1',
            labelInColumn: true
          },
          {
            type: 'default',
            name: 'limit',
            value: mask.currency(form.limit),
            handleChange,
            label: 'Limite de crédito',
            placeholder: 'RS 945,00',
            labelInColumn: true
          },
          {
            type: 'default',
            name: 'closingDate',
            value: form.closingDate,
            handleChange,
            label: 'Dia do fechamento',
            placeholder: '01',
            labelInColumn: true
          },
          {
            type: 'default',
            name: 'dueDate',
            value: form.dueDate,
            handleChange,
            label: 'Dia do vencimento',
            placeholder: '05',
            labelInColumn: true
          },
        ]}
      />
    </LayoutContainer>
  );
}