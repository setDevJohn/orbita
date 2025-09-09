import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { LoadingPage } from '@components/Loading';
import { usersApi } from '@services/users';
import { toastFire } from '@utils/sweetAlert';
import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const TokenStep = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      toastFire('Erro ao obeter informação do usuário', 'error');
      return navigate('/recuperar-senha'); 
    }

    if (!token) {
      toastFire('Informe o token de recuperação', 'warning');
      return navigate('/recuperar-senha'); 
    }

    try {
      setLoading(true);

      await usersApi.confirmTokenToRecoverPassword(+userId, token);

      navigate(`/recuperar-senha/nova-senha?userId=${userId}&token=${token}`);
    } catch (err) {
      console.error(err);
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const formFields = {
    label: 'Token',
    type: 'text',
    name: 'token',
    placeholder: '-  -  -  -  -  -',
    value: token,
    handleChange: (_: string, value: string) => setToken(value),
  };

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title>Recuperação de Senha</Title>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <TextInputWithLabel
            { ...formFields }
            labelInColumn
          />

          <SubmitButton text='Confirmar' />
        </Form>

        <FormFooter>
          <span>
            Utilize o token enviado por email para redefinição da senha
          </span>

          <a href="/login">Voltar para o login</a>
        </FormFooter>
      </FormContainer>

      {loading && <LoadingPage />}
    </LoginContainer>
  );
};