import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { usersApi } from '@services/users';
import { toastError, toastWarn } from '@utils/toast';
import { FormEvent, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormHeader, LoginContainer } from '../styles';

export const NewPasswordStep = () => {
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    passwordConfirmation: ''
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!userId || !token) {
        toastError('Erro ao obeter informação do usuário');
        return navigate('/recuperar-senha'); 
      }

      if (!passwordForm.password) {
        return toastWarn('Informe sua nova senha');
      }

      if (passwordForm.password !== passwordForm.passwordConfirmation) {
        return toastWarn('As senhas não coincidem');
      } 

      await usersApi.recoverPassword(+userId, passwordForm.password, token);
      navigate('/');
    } catch (err) {
      console.error(err);
      toastError((err as Error).message);
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
          {formFields.map((fields, i) => (
            <TextInputWithLabel
              key={i}
              { ...fields }
              labelInColumn
            />  
          ))}
          
          <SubmitButton text='Redefinir' />
        </Form>
      </FormContainer>
    </LoginContainer>
  );
};