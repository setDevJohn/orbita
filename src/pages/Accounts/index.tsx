import { BasicButton } from '@components/Buttons';
import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading/Page';
import { ConfirmationModal } from '@components/Modals';
import { accountsApi } from '@services/accounts';
import { AccountBase, AccountRaw } from '@services/accounts/interface';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { toastError, toastSuccess, toastWarn } from '@utils/toast';
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
  const [removeModal, setRemoveModal] = useState(false);
  const [accounts, setAccounts] = useState<AccountRaw[]>([]);
  const [accountToRemove, setAccountToRemove] = useState<{id: number; name: string} | null>(null);
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
        toastError((err as Error).message);
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
      return toastWarn('Escolha um nome para conta');
    }
    if (!form.balance) {
      return toastWarn('Escolha um saldo para conta');
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        balance: format.currencyToDecimal(form.balance),
      };

      if (editMode) {
        if (!payload.id) {
          return toastError('Erro ao atualizar a conta.');
        }

        await accountsApi.update(payload as AccountBase);
        toastSuccess('Conta atualizada com sucesso');
      } else {
        await accountsApi.create(payload);
        toastSuccess('Conta criada com sucesso');
      }

      reloadComponent();
      handleCancel();
    } catch (err) {
      toastError((err as Error).message);
    } finally {
      setLoading(false);
    }

  };

  const handleRemove = async () => {
    try {
      setLoading(true);

      if (!accountToRemove?.id) {
        return toastError('Erro ao remover a conta.');
      }

      await accountsApi.remove(accountToRemove.id);
      reloadComponent();
      setRemoveModal(false);
      toastSuccess('Conta removida com sucesso');
    } catch (err) {
      toastError((err as Error).message);
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
      placeholder: 'Conta Poupanca',
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
                action={() => {
                  setAccountToRemove({ id, name });
                  setRemoveModal(true);
                }}
              />
            </ButtonsContainer>
          </AccountCard>
        ))}
      </AccountsList>

      {removeModal && (
        <ConfirmationModal 
          cancelAction={() => setRemoveModal(false)}
          confirmAction={handleRemove}
          text={`
            Deseja realmente excluir essa conta?
            (${accountToRemove?.name})
          `}
        />
      )}
      
      {loading && <LoadingPage />}  
    </LayoutContainer>
  );
}