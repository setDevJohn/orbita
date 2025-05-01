import { BasicButton, ToggleButton } from '@components/Buttons';
import { DateInput, SelectInput, TextInputWithLabel } from '@components/Inputs';
import { LayoutContainer } from '@components/LayoutContainer';
import { useState } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'styles/main';

import { Content, Footer, InputContainer, Price, PriceContainer, ToggleContainer } from './styles';

interface IForm {
  description: string;
  price: string;
  account: string;
  category: string;
  date: Date | null;
}

export function Register() {
  const formValue = {
    description: '',
    price: '',
    account: '',
    category: '',
    date: null
  };

  const [form, setForm] = useState<IForm>(formValue);
  const [toggleRecurrence, setToggleRecurrence] = useState<boolean>(false);
  const [toggleMovement, setToggleMovement] = useState<boolean>(false);

  const { type } = useParams();

  const navigate = useNavigate();

  if (!type || !['receita', 'despesa', 'despesa-credito'].includes(type)) { return null; }

  const pageConfig = {
    receita: {
      title: 'Receitas',
      icon: <FaArrowTrendUp size={30} fill="#0f0" style={{ marginRight: ' auto' }}/>
    },
    despesa: {
      title: 'Despesas',
      icon: <FaArrowTrendDown size={30} fill="#f00" style={{ marginRight: ' auto' }}/>
    },
    'despesa-credito': {
      title: 'Despesas Crédito',
      icon: <BsCreditCard size={30} fill="#f00" style={{ marginRight: ' auto' }}/>
    }
  }[type];

  if (!pageConfig) { return null; }

  function handleChangeForm ( name: string, value: string | Date | null) {
    setForm(prev => ({ ...prev, [name]: value }));    
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
            handleChange={(date) => handleChangeForm('date', date)}
            placeholder='Selecione uma data'
          />

          <ToggleContainer>
            <Text>Recorrência</Text>

            {/* Ao fechar o toggle, limpar seleçoes referentes a recorrência */}
            <ToggleButton 
              checked={toggleRecurrence}
              handleClick={() => setToggleRecurrence(prev => !prev)}
            />
          </ToggleContainer>

          <ToggleContainer>
            <Text>Movimentação entre contas</Text>

            {/* Ao fechar o toggle, limpar seleçoes referentes a movimentação */}
            <ToggleButton 
              checked={toggleMovement}
              handleClick={() => setToggleMovement(prev => !prev)}
            />
          </ToggleContainer>
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