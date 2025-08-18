import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { usersApi } from '@services/users';
import { toastError, toastWarn } from '@utils/toast';
import { FormEvent, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const TokenStep = () => {
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!userId) {
        toastError('Erro ao obeter informação do usuário');
        return navigate('/recuperar-senha'); 
      }

      if (!token) {
        toastWarn('Informe o token de recuperação');
        return navigate('/recuperar-senha'); 
      }

      await usersApi.confirmTokenToRecoverPassword(+userId, token);

      navigate(`/recuperar-senha/nova-senha?userId=${userId}&token=${token}`);
    } catch (err) {
      console.error(err);
      toastError((err as Error).message);
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
          <IoArrowBackOutline
            size={27}
            fill='#ffffff'
            onClick={() => navigate('/login')}
            style={{
              position: 'absolute',
              top: '31px',
              left: '-10px',
              cursor: 'pointer'
            }}
          />
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
        </FormFooter>
      </FormContainer>
    </LoginContainer>
  );
};