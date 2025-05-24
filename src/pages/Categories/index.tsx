import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { toastError } from '@utils/toast';
import { useEffect, useState } from 'react';

interface IForm {
  name: string;
  balance: string;
}

export function Categories() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<IForm>({
    name: '',
    balance: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {};

  const fieldsForm: FieldsProps[] = [
    {
      type: 'default',
      name: 'name',
      value: form.name,
      handleChange,
      label: 'Nome',
      placeholder: 'Comida',
      labelInColumn: true
    }
  ];

  return (
    <LayoutContainer title="Categorias">
      <Form
        title='Nova Categoria'
        onSubmit={handleSubmit}
        fields={fieldsForm}
      />
      
      {loading && <LoadingPage />}
    </LayoutContainer>
  );
}