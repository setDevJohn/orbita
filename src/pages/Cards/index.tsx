import { CardList } from '@components/CardList';
import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { cardsApi } from '@services/cards';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { toastError, toastSuccess, toastWarn } from '@utils/toast';
import { useEffect, useState } from 'react';
import { Separator, Title } from 'styles/main';

interface IForm {
  name: string;
  creditLimit: string;
  closingDay: string;
  dueDay: string;
}

export function Cards() {
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const [form, setForm] = useState<IForm>({
    name: '',
    creditLimit: '',
    closingDay: '',
    dueDay: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setCardList([]);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadList]);

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const reloadComponent = () => {
    setReloadList(!reloadList);
    setForm({ name: '', creditLimit: '', closingDay: '', dueDay: '' });
    // TODO tirar o foco do input
  };

  const handleSubmit = async () => {
    const emptyFields = Object.values(form).some(value => !value);

    if (emptyFields) {
      return toastWarn('Preencha todos os campos');
    }

    try {
      setLoading(true);
      const payload = {
        name: form.name,
        creditLimit: format.currencyToDecimal(form.creditLimit),
        closingDay: Number(form.closingDay),
        dueDay: Number(form.dueDay),
      };

      await cardsApi.create(payload);
      
      toastSuccess('Cartão cadastrado com sucesso.');
      reloadComponent();
    } catch (err) {
      toastError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
      name: 'creditLimit',
      value: mask.currency(form.creditLimit),
      handleChange,
      label: 'Limite de crédito',
      labelInColumn: true
    },
    {
      type: 'default',
      name: 'closingDay',
      value: form.closingDay,
      handleChange,
      label: 'Dia do fechamento',
      placeholder: '01',
      labelInColumn: true
    },
    {
      type: 'default',
      name: 'dueDay',
      value: form.dueDay,
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