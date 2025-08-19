import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { LoadingPage } from '@components/Loading';
import { usersApi } from '@services/users';
import { toastError, toastSuccess, toastWarn } from '@utils/toast';
import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const NewPasswordStep = () => {
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    passwordConfirmation: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId || !token) {
      toastError('Erro ao obeter informação do usuário');
      return navigate('/recuperar-senha'); 
    }

    if (!passwordForm.password) {
      return toastWarn('Informe sua nova senha');
    }

    if (passwordForm.password.length < 6) {
      return toastWarn('A senha deve ter no mínimo 6 caracteres');
    }

    if (passwordForm.password !== passwordForm.passwordConfirmation) {
      return toastWarn('As senhas não coincidem');
    } 

    try {
      setLoading(true);

      await usersApi.recoverPassword(+userId, passwordForm.password, token);

      toastSuccess('Senha redefinida com sucesso');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toastError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      label: 'Senha',
      name: 'password',
      type: 'password',
      placeholder: '***********',
      value: passwordForm.password,
      handleChange: (name: string, value: string) => 
        setPasswordForm(prev => ({ ...prev, [name]: value })),
    },
    {
      label: 'Confirmação de senha',
      name: 'passwordConfirmation',
      type: 'password',
      placeholder: '***********',
      value: passwordForm.passwordConfirmation,
      handleChange: (name: string, value: string) => 
        setPasswordForm(prev => ({ ...prev, [name]: value })),
    },
  ];

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title>Recuperação de Senha</Title>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          {formFields.map((fields, i) => (
            <TextInputWithLabel
              key={i}
              { ...fields }
              labelInColumn
            />  
          ))}
          
          <SubmitButton text='Redefinir' />
        </Form>

        <FormFooter>
          <a href="/login">Voltar para o login</a>
        </FormFooter>
      </FormContainer>
      
      {loading && <LoadingPage />}
    </LoginContainer>
  );
};