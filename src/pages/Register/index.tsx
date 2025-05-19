import { BasicButton } from '@components/Buttons';
import { DateInput, DefaultInput, SelectInput, TextInputWithLabel } from '@components/Inputs';
import { Mode } from '@components/Inputs/Date';
import { IOption } from '@components/Inputs/Select';
import { LayoutContainer } from '@components/LayoutContainer';
import { accountsApi } from '@services/accounts';
import { categoriesApi } from '@services/categories';
import { mask } from '@utils/mask';
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
  Separator 
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
  transferAccount: string;
}

interface IOptions {
  accounts: IOption[];
  categories: IOption[];
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
    transferAccount: '',
  };

  const optionsValue: IOptions = {
    accounts: [],
    categories: [],
  };

  const [form, setForm] = useState<IForm>(formValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions>(optionsValue);
  const [activeButtonDate, setActiveButtonDate] = useState<Mode>('day');

  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fecthCategories() {
      try {
        setLoading(true);

        const accountsResponse = await accountsApi.get();
        const categoriesResponse = await categoriesApi.get();

        setOptions({
          accounts: accountsResponse.map(account => (
            { label: account.name, value: account.id.toString() }
          )),
          categories: categoriesResponse.map(category => (
            { label: category.name, value: category.id.toString() }
          ))
        });

      } catch (err) {
        console.error((err as Error).message);
        // toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fecthCategories();
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

  function handleSubmit () {
    // if (!form.price) { return toastError('Valor é obrigatório.'); }
    // if (!form.description) { return toastError('Descrição é obrigatória.'); }
    // if (!form.date) { return toastError('Data da transação é obrigatória.'); }
    // if (pageConfig.title === 'Despesas Crédito' && !form.card) { 
    //   return toastError('Cartão é obrigatório.');
    // }
    // if (pageConfig.title !== 'Despesas Crédito' && !form.account) { 
    //   return toastError('Conta é obrigatório.');
    // }
    
    const payload = {
      name: form.description,
      type: pageConfig!.title === 'Receitas' ? 'income' : 'expense',
      amount: mask.currencyToDecimal(form.price),
      transactionDate: form.date?.toJSON(),
      source: form.account ? 'account' : 'card',
      categoryId: Number(form.category) || null,
      ...(form.card && { cardId: Number(form.card) }),
      ...(form.account && { accountId: Number(form.account) }),
      ...(form.transferAccount && { transferAccountId: Number(form.transferAccount) }),
      ...(form.recurrenceDateRange.every(date => !!date) && { 
        recurrenceDateRange: form.recurrenceDateRange.map(date => date?.toJSON())
      }),
    };

    console.log(payload);
  }

  return (
    <LayoutContainer title={pageConfig.title}>
      <Content>
        <PriceContainer>
          <DefaultInput 
            type='text'
            name='price'
            width='60%'
            size='28'
            value={mask.currency(form.price)}
            handleChange={handleChangeForm}
          />
        </PriceContainer>

        <Separator />

        <InputContainer>
          <TextInputWithLabel
            value={form.description}
            label='Descrição'
            name='description'
            placeholder='Transação xyz'
            handleChange={handleChangeForm}
          />

          {pageConfig.title === 'Despesas Crédito' ? (
            <SelectInput
              label='Cartão'
              name='card'
              value={form.card}
              placeholder='Selecione um catão'
              handleChange={handleChangeForm}
              options={[]}
            />
          ) : (
            <SelectInput
              label='Conta'
              name='account'
              value={form.account}
              placeholder='Selecione uma conta'
              handleChange={handleChangeForm}
              options={options.accounts}
            />
          )}

          <SelectInput
            label='Categoria'
            name='category'
            value={form.category}
            placeholder='Selecione uma categoria'
            handleChange={handleChangeForm}
            options={options.categories}
          />
            
          <DateInput
            label='Data do registro'
            startDate={form.date}
            placeholder='dd / mm / aaaa'
            handleChange={(date) => handleChangeForm('date', date as Date)}
          />

          <ToggleDropdown 
            text='Recorrência' 
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
          
          {pageConfig.title !== 'Receitas' && (
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