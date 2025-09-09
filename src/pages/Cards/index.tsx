import { BasicButton } from '@components/Buttons';
import { CardList } from '@components/CardList';
import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { cardsApi } from '@services/cards';
import { CardRaw } from '@services/cards/interface';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { questionFire, toastFire } from '@utils/sweetAlert';
import { useEffect, useRef, useState } from 'react';
import { Separator, Title } from 'styles/main';

interface IForm {
  id?: number;
  name: string;
  creditLimit: string;
  closingDay: string;
  dueDay: string;
}

export function Cards() {
  const [loading, setLoading] = useState(true);
  const [cardList, setCardList] = useState<CardRaw[]>([]);
  const [reloadList, setReloadList] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState<IForm>({
    name: '',
    creditLimit: '',
    closingDay: '',
    dueDay: '',
  });

  const contentRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await cardsApi.get();
        setCardList(response);
      } catch (err) {
        toastFire((err as Error).message, 'error');
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
  };

  const handleCancel = () => {
    setForm({ name: '', creditLimit: '', closingDay: '', dueDay: '' });
    setEditMode(false);
    setOpenForm(false);
  };

  const handleSubmit = async () => {
    const emptyFields = Object.values(form).some(value => !value);

    if (emptyFields) {
      return toastFire('Preencha todos os campos', 'warning');
    }

    try {
      setLoading(true);
      const payload = {
        name: form.name,
        creditLimit: format.currencyToDecimal(form.creditLimit),
        closingDay: Number(form.closingDay),
        dueDay: Number(form.dueDay),
      };

      if (editMode) {
        if (!form.id) { 
          return toastFire('Erro ao atualizar o cartão.', 'error');
        }

        await cardsApi.update({ ...payload, id: form.id });
        toastFire('Cartão atualizado com sucesso.');
      } else {
        await cardsApi.create(payload);
        toastFire('Cartão cadastrado com sucesso.');
      }
      
      handleCancel();
      reloadComponent();
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const editFunction = (card: CardRaw) => {
    setForm({
      id: card.id,
      name: card.name,
      creditLimit: mask.brlCurrency(card.creditLimit.toString()),
      closingDay: String(card.closingDay).padStart(2, '0'),
      dueDay: String(card.dueDay).padStart(2, '0'),
    });
    setEditMode(true);
    setOpenForm(true);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemove = async (id: number) => {
    try {
      const result = await questionFire();

      if (result.isConfirmed) {
        setLoading(false);

        await cardsApi.remove(id);

        reloadComponent();
        toastFire('Cartão removido com sucesso.');
      }
    } catch (err) {
      toastFire((err as Error).message, 'error');
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

  const formProps = {
    onSubmit: handleSubmit,
    fields: fieldsForm,
    cancelFunction: handleCancel
  };

  return (
    <LayoutContainer title="Cartões" ref={contentRef}>
      
      {openForm 
        ? (
          <>
            {editMode 
              ? <Form title="Editar Cartão" {...formProps} />
              : <Form title="Novo Cartão" {...formProps} />
            }
          </>
        ) : (
          <BasicButton
            text="Novo Cartão"
            action={() => setOpenForm(true)}
            custonStyle={{ width: '70%', marginTop: '20px' }}
          />
        )
      }

      <Separator $margin={20}/>

      <Title $margin='20px 0 0 0'>
        {!cardList.length ? 'Nenhum cartão cadastrado' : 'Cartões cadastrados'}
      </Title>

      <CardList 
        editMode 
        cardList={cardList}
        editFunction={editFunction}
        removeFunction={handleRemove}
      />

      {loading && <LoadingPage />}
    </LayoutContainer>
  );
}