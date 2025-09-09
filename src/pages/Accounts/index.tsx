import { BasicButton } from '@components/Buttons';
import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading/Page';
import { accountsApi } from '@services/accounts';
import { AccountBase, AccountRaw } from '@services/accounts/interface';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { questionFire, toastFire } from '@utils/sweetAlert';
import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import { Separator, Title } from 'styles/main';

import { AccountBalance, AccountCard, AccountContent, AccountName, AccountsList, ButtonsContainer } from './styles';

interface IForm {
  id?: number;
  name: string;
  balance: string;
}

export function Accounts() {
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const [accounts, setAccounts] = useState<AccountRaw[]>([]);
  const [form, setForm] = useState<IForm>({
    name: '',
    balance: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await accountsApi.get();
        setAccounts(response);
      } catch (err) {
        toastFire((err as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadList]);

  const reloadComponent = () => {
    setReloadList(!reloadList);
  };

  const handleCancel = () => {
    setForm({ name: '', balance: '' });
    setEditMode(false);
    setOpenForm(false);
  };

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name) {
      return toastFire('Escolha um nome para conta', 'warning');
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        balance: format.currencyToDecimal(form.balance),
      };

      if (editMode) {
        if (!payload.id) {
          return toastFire('Erro ao atualizar a conta.', 'error');
        }

        await accountsApi.update(payload as AccountBase);
        toastFire('Conta atualizada com sucesso');
      } else {
        await accountsApi.create(payload);
        toastFire('Conta criada com sucesso');
      }

      reloadComponent();
      handleCancel();
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }

  };

  const handleRemove = async  (id: number) => {
    try {
      const result = await questionFire();

      if (result.isConfirmed) {
        setLoading(true);

        await accountsApi.remove(id);
        
        reloadComponent();
        toastFire('Conta removida com sucesso');
      }
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = ({ id, name, balance }: IForm) => {
    setForm({ id, name, balance: parseFloat(balance).toFixed(2) });
    setOpenForm(true);
    setEditMode(true);
  };

  const fieldsForm: FieldsProps[] = [
    {
      type: 'default',
      name: 'name',
      value: form.name,
      handleChange,
      label: 'Nome',
      placeholder: 'Conta Corrente',
      labelInColumn: true
    },
    {
      type: 'default',
      name: 'balance',
      value: mask.currency(form.balance),
      handleChange,
      label: 'Saldo',
      labelInColumn: true
    },
  ];

  const formProps = {
    onSubmit: handleSubmit,
    fields: fieldsForm,
    cancelFunction: handleCancel
  };

  return (
    <LayoutContainer title="Contas">
      {openForm 
        ? (
          <>
            {editMode
              ? <Form title="Editar Conta" {...formProps} />
              : <Form title="Nova Conta" {...formProps} />
            }
          </>
        ) : (
          <BasicButton
            text="Nova Conta"
            action={() => setOpenForm(true)}
            custonStyle={{ width: '70%', marginTop: '20px' }}
          />
        )
      }

      <Separator $margin={20}/>

      <Title $margin='20px 0 0 0'>
        {!accounts.length ? 'Nenhuma conta cadastrada' : 'Contas cadastradas'}
      </Title>

      <AccountsList>
        {accounts.map(({ id, name, balance }, i) => (
          <AccountCard key={i}>
            <AccountContent>
              <AccountName>{name}</AccountName>
              
              <AccountBalance>{`Saldo: ${mask.brlCurrency(balance)}`}</AccountBalance>
            </AccountContent>
      
            <ButtonsContainer>
              <BasicButton
                icon={<BiEdit size={20} fill="#fff" />}
                custonStyle={{ minWidth: 'unset' }}
                action={() => handleEdit({ id, name, balance })}
              />
      
              <BasicButton
                type='cancel'
                icon={<IoTrashOutline size={20} fill="#fff" />}
                custonStyle={{ minWidth: 'unset' }}
                action={() => handleRemove(id)}
              />
            </ButtonsContainer>
          </AccountCard>
        ))}
      </AccountsList>

      {loading && <LoadingPage />}  
    </LayoutContainer>
  );
}