import { BasicButton } from '@components/Buttons';
import { DateInput, SelectInput, TextInputWithLabel } from '@components/Inputs';
import { Mode } from '@components/Inputs/Date';
import { LayoutContainer } from '@components/LayoutContainer';
import { useState } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import { ToggleDropdown } from './components/ToggleDropdown';
import { dateButtonList } from './dateButtonList';
import { Content, DateButton, DateButtonContainer, Footer, InputContainer, Price, PriceContainer } from './styles';

interface IForm {
  description: string;
  price: string;
  account: string;
  category: string;
  date: Date | null;
}

type TDateRange = [Date | null, Date | null];
type TChangeFormValue = string | Date | null | TDateRange;

export function Register() {
  const formValue = {
    description: '',
    price: '',
    account: '',
    category: '',
    date: null
  };

  const [form, setForm] = useState<IForm>(formValue);
  const [activeButtonDate, setActiveButtonDate] = useState<Mode>('day');
  const [recurrenceDateRange, setRecurrenceDateRange] = useState<TDateRange>([null, null]);

  const { type } = useParams();
  const navigate = useNavigate();

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
    setRecurrenceDateRange([null, null]);
  }

  function clearRecurrenceStorage () {
    setActiveButtonDate('day');
    setRecurrenceDateRange([null, null]);
  }

  return (
    <LayoutContainer title={pageConfig.title}>
      <Content>
        <PriceContainer>
          <Price 
            type='text'
            value={`R$ ${form.price || '0,00'}`}
            onChange={({ target :{ value } }) => handleChangeForm('price', value)}
          />

          {pageConfig.icon}
        </PriceContainer>

        <InputContainer>
          <TextInputWithLabel
            value={form.description}
            label='Descrição'
            name='description'
            handleChange={handleChangeForm}
          />

          <SelectInput
            label='Conta'
            name='account'
            value={form.account}
            placeholder='Selecione uma conta'
            handleChange={handleChangeForm}
            options={[]}
          />

          <SelectInput
            label='Categoria'
            name='category'
            value={form.category}
            placeholder='Selecione uma categoria'
            handleChange={handleChangeForm}
            options={[]}
          />
            
          <DateInput
            startDate={form.date}
            handleChange={(date) => handleChangeForm('date', (date as Date))}
            placeholder='Selecione uma data'
          />

          <ToggleDropdown 
            text='Recorrência' 
            clearToggleStorage={clearRecurrenceStorage}
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
              startDate={recurrenceDateRange[0]}
              endDate={recurrenceDateRange[1]}
              handleChange={(date) => setRecurrenceDateRange(date as TDateRange)} 
              placeholder='Periodo'
              mode={activeButtonDate}
              isRange
            />
          </ToggleDropdown>

          <ToggleDropdown text='Transferência entre contas'>
            <div></div>
          </ToggleDropdown>
        </InputContainer>
      </Content>
      
      <Footer>
        <BasicButton 
          text='Cancelar'
          type='cancel'
          action={() => navigate('/inicio')}
        />

        <BasicButton text='Confirmar' type='confirm'/>
      </Footer>
    </LayoutContainer>
  );
}