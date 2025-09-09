import { BasicButton } from '@components/Buttons';
import { DateInput, DefaultInput, SelectInput, TextInputWithLabel } from '@components/Inputs';
import { Mode } from '@components/Inputs/Date';
import { IOption } from '@components/Inputs/Select';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { accountsApi } from '@services/accounts';
import { cardsApi } from '@services/cards';
import { categoriesApi } from '@services/categories';
import { transactionsApi } from '@services/transactions';
import { TransactionsFormPayload } from '@services/transactions/interfaces';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { toastFire } from '@utils/sweetAlert';
import { useEffect, useState } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import { ToggleDropdown } from './components/ToggleDropdown';
import { dateButtonList } from './dateButtonList';
import { 
  Content, 
  DateButton, 
  DateButtonContainer, 
  Footer, 
  InputContainer, 
  PriceContainer, 
} from './styles';

type TDateRange = [Date | null, Date | null];
type TChangeFormValue = string | Date | null | TDateRange;

interface IForm {
  description: string;
  price: string;
  account: string;
  card: string;
  category: string;
  date: Date | null;
  recurrenceDateRange: TDateRange;
}

interface IOptions {
  accounts: IOption[];
  categories: IOption[];
  cards: IOption[];
}

export function Register() {
  const formValue: IForm = {
    description: '',
    price: '',
    account: '',
    card: '',
    category: '',
    date: null,
    recurrenceDateRange: [null, null],
  };

  const optionsValue: IOptions = {
    accounts: [],
    categories: [],
    cards: [],
  };

  const [form, setForm] = useState<IForm>(formValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions>(optionsValue);
  const [activeButtonDate, setActiveButtonDate] = useState<Mode>('day');

  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fecthOptions() {
      try {
        setLoading(true);

        const [accountsResponse, categoriesResponse, cardsResponse] = await Promise.all([
          accountsApi.get(),
          categoriesApi.get(),
          cardsApi.get(),
        ]); 

        setOptions({
          accounts: accountsResponse.map(account => (
            { label: account.name, value: account.id.toString() }
          )),
          categories: categoriesResponse.map(category => (
            { label: category.name, value: category.id.toString() }
          )),
          cards: cardsResponse.map(card => (
            { label: card.name, value: card.id.toString() }
          ))
        });

      } catch (err) {
        toastFire((err as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    }
    fecthOptions();
  }, []);

  if (!type || !['receita', 'despesa', 'despesa-credito'].includes(type)) { return null; }

  const pageConfig = {
    receita: {
      title: 'Receitas',
      icon: <FaArrowTrendUp size={30} fill="#0f0"/>
    },
    despesa: {
      title: 'Despesas',
      icon: <FaArrowTrendDown size={30} fill="#f00"/>
    },
    'despesa-credito': {
      title: 'Despesas Crédito',
      icon: <BsCreditCard size={30} fill="#f00"/>
    }
  }[type];

  if (!pageConfig) { return null; }

  function handleChangeForm ( name: string, value: TChangeFormValue) {
    setForm(prev => ({ ...prev, [name]: value }));    
  }

  function handleSelectDateMode (dateMode: Mode) {
    setActiveButtonDate(dateMode);
    setForm(prev => ({ ...prev, recurrenceDateRange: [null, null] }));
  }

  function clearRecurrenceStorage () {
    setActiveButtonDate('day');
    setForm(prev => ({ ...prev, recurrenceDateRange: [null, null] }));
  }

  async function handleSubmit () {
    if (!form.price) { return toastFire('Valor é obrigatório.', 'warning'); }
    if (!form.description) { return toastFire('Descrição é obrigatória.', 'warning'); }
    if (!form.date) { return toastFire('Data da transação é obrigatória.', 'warning'); }
    if (pageConfig?.title === 'Despesas Crédito' && !form.card) { 
      return toastFire('Cartão é obrigatório.', 'warning');
    }
    if (pageConfig?.title !== 'Despesas Crédito' && !form.account) { 
      return toastFire('Conta é obrigatório.', 'warning');
    }
    
    const payload: TransactionsFormPayload = {
      name: form.description,
      type: pageConfig!.title === 'Receitas' ? 'income' : 'expense',
      amount: format.currencyToDecimal(form.price),
      transactionDate: form.date?.toJSON(),
      source: form.account ? 'account' : 'card',
      categoryId: Number(form.category),
      ...(form.card && { cardId: Number(form.card) }),
      ...(form.account && { accountId: Number(form.account) }),
      ...(form.recurrenceDateRange.every(date => !!date) && { 
        recurrenceDateType: activeButtonDate 
      }),
      ...(form.recurrenceDateRange.every(date => !!date) && { 
        recurrenceDateRange: form.recurrenceDateRange
          .filter(date => !!date)
          .map(date => date?.toJSON())
      }),
    };

    try {
      setLoading(true);
      await transactionsApi.create(payload);
      toastFire('Transação cadastrada com sucesso.');
      setForm(formValue);
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutContainer title={pageConfig.title}>
      {loading && <LoadingPage />}

      <Content>
        <PriceContainer>
          <DefaultInput 
            type='text'
            name='price'
            width='67%'
            size='26'
            value={mask.currency(form.price)}
            handleChange={handleChangeForm}
          />
        </PriceContainer>

        <InputContainer>
          <TextInputWithLabel
            value={form.description}
            label='Descrição'
            name='description'
            labelInColumn
            placeholder='Transação xyz'
            handleChange={handleChangeForm}
          />

          {pageConfig.title === 'Despesas Crédito' ? (
            <SelectInput
              label='Cartão'
              name='card'
              labelInColumn
              value={form.card}
              placeholder='Selecione um catão'
              handleChange={handleChangeForm}
              options={options.cards}
            />
          ) : (
            <SelectInput
              label='Conta'
              name='account'
              labelInColumn
              value={form.account}
              placeholder='Selecione uma conta'
              handleChange={handleChangeForm}
              options={options.accounts}
            />
          )}

          <SelectInput
            label='Categoria'
            name='category'
            labelInColumn
            value={form.category}
            placeholder='Selecione uma categoria'
            handleChange={handleChangeForm}
            options={options.categories}
          />
            
          <DateInput
            label='Data do registro'
            startDate={form.date}
            labelInColumn
            placeholder='dd / mm / aaaa'
            handleChange={(date) => handleChangeForm('date', date as Date)}
          />

          <ToggleDropdown
            text='Recorrência'
            noAlign
            clearToggleStorage={clearRecurrenceStorage}
            customStyle={{ marginTop: '25px' }}
          >
            <DateButtonContainer>
              {dateButtonList.map((item) => (
                <DateButton
                  key={item.value}
                  $active={item.value === activeButtonDate}
                  onClick={() => handleSelectDateMode(item.value)}
                >
                  {item.name}
                </DateButton>
              ))}
            </DateButtonContainer>

            <DateInput 
              startDate={form.recurrenceDateRange[0]}
              endDate={form.recurrenceDateRange[1]}
              handleChange={(date) => ( 
                handleChangeForm('recurrenceDateRange', date as TDateRange)
              )} 
              placeholder='Selecione um periodo'
              mode={activeButtonDate}
              isRange
            />
          </ToggleDropdown>
          {/* 
            {pageConfig.title === 'Despesas' && (
              <ToggleDropdown text='Transferência entre contas' noAlign>
                <SelectInput
                  label='Conta'
                  minWidth='80px'
                  name='transferAccount'
                  value={form.transferAccount}
                  placeholder='Selecione uma conta'
                  handleChange={handleChangeForm}
                  options={options.accounts.filter(account => account.value !== form.account)}
                />
              </ToggleDropdown>
            )}
          */} 
        </InputContainer>
      </Content>
      
      <Footer>
        <BasicButton 
          text='Cancelar'
          type='cancel'
          action={() => navigate('/inicio')}
        />

        <BasicButton text='Confirmar' type='confirm' action={handleSubmit}/>
      </Footer>
    </LayoutContainer>
  );
}