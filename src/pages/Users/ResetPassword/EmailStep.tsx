import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { LoadingPage } from '@components/Loading';
import { usersApi } from '@services/users';
import { toastError, toastWarn } from '@utils/toast';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const EmailStep = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      return toastWarn('Informe o e-mail da sua conta');
    }

    try {
      setLoading(true);
      
      const userResponse = await usersApi.sendEmailToRecoverPassword(email);

      navigate(`/recuperar-senha/token?userId=${userResponse.id}`);
    } catch (err) {
      console.error(err);
      toastError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const formFields = {
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'seuemail@exemplo.com',
    value: email,
    handleChange: (_: string, value: string) => setEmail(value),
  };

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title>Recuperação de Senha</Title>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <TextInputWithLabel
            {...formFields}
            labelInColumn
          />

          <SubmitButton text='Enviar' />
        </Form>

        <FormFooter>
          <span>
            Se existir um cadastro nesse email será enviado um token para redefinição da senha
          </span>

          <a href="/login">Voltar para o login</a>
        </FormFooter>
      </FormContainer>

      {loading && <LoadingPage />}
    </LoginContainer>
  );
};