import { CardList } from '@components/CardList';
import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { mask } from '@utils/mask';
import { toastError } from '@utils/toast';
import { useEffect, useState } from 'react';
import { Separator, Title } from 'styles/main';

interface IForm {
  name: string;
  limit: string;
  closingDate: string;
  dueDate: string;
}

export function Cards() {
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [form, setForm] = useState<IForm>({
    name: '',
    limit: '',
    closingDate: '',
    dueDate: '',
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
      placeholder: 'Cartão banco 1',
      labelInColumn: true
    },
    {
      type: 'default',
      name: 'limit',
      value: mask.currency(form.limit),
      handleChange,
      label: 'Limite de crédito',
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
  ];

  return (
    <LayoutContainer title="Cartões">
      <Form 
        title="Novo Cartão"
        onSubmit={handleSubmit}
        fields={fieldsForm}
      />

      <Separator $margin={20}/>

      <Title $margin='20px 0 0 0'>
        {!cardList.length ? 'Nenhum cartão cadastrado' : 'Cartões cadastrados'}
      </Title>

      <CardList />

      {loading && <LoadingPage />}
    </LayoutContainer>
  );
}