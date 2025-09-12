import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { LoadingPage } from '@components/Loading';
import { usersApi } from '@services/users';
import { toastFire } from '@utils/sweetAlert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formValue).some(value => !value)) {
      return toastFire('Preencha todos os campos!', 'warning');
    }

    if (formValue.password.length < 6) {
      return toastFire('A senha deve ter no mínimo 6 caracteres', 'warning');
    }

    if (formValue.password !== formValue.passwordConfirmation) {
      return toastFire('As senhas não coincidem', 'warning');
    } 

    try {
      setLoading(true);

      await usersApi.register(formValue);
      
      toastFire('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };

  const fields = [
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
      placeholder: 'Nome Sobrenome',
      value: formValue.name,
      handleChange,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'seuemail@exemplo.com',
      value: formValue.email,
      handleChange,
    },
    {
      label: 'Senha',
      name: 'password',
      type: 'password',
      placeholder: '***********',
      value: formValue.password,
      handleChange,
    },
    {
      label: 'Confirmação de senha',
      name: 'passwordConfirmation',
      type: 'password',
      placeholder: '***********',
      value: formValue.passwordConfirmation,
      handleChange,
    },
  ];

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title $bigSize >Registro</Title>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          {fields.map(field => (
            <TextInputWithLabel key={field.name} {...field} labelInColumn />
          ))}

          <SubmitButton text="Registre-se" />
        </Form>

        <FormFooter>
          <a href="/login">Já possui um cadastro? Faça login</a>
        </FormFooter>
      </FormContainer>

      {loading && <LoadingPage />}
    </LoginContainer>
  );
};