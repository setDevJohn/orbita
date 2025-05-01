import { BasicButton } from '@components/Buttons';
import { LayoutContainer } from '@components/LayoutContainer';
import { useNavigate, useParams } from 'react-router-dom';

import { Content, Footer } from './styles';

export function Register() {
  const { type } = useParams();

  const navigate = useNavigate();

  if (!type || !['receita', 'despesa', 'despesa-credito'].includes(type)) { return null; }

  const pageConfig = {
    receita: {
      title: 'Receitas',
    },
    despesa: {
      title: 'Despesas',
    },
    'despesa-credito': {
      title: 'Despesas Crédito',
    }
  }[type];

  if (!pageConfig) { return null; }

  return (
    <LayoutContainer title={pageConfig.title}>
      <Content></Content>
      
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