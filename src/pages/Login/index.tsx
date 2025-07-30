import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { usersApi } from '@services/users';
import { toastError, toastWarn } from '@utils/toast';
import { useState } from 'react';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from './styles';

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formValue).some(value => !value)) {
      return toastWarn('Preencha todos os campos!');
    }

    if (formValue.password.length < 8) {
      return toastWarn('A senha deve ter no mínimo 8 caracteres');
    }

    try {
      const response = await usersApi.login(formValue);
      console.log(response);
    } catch (err) {
      console.error(err);
      toastError((err as Error).message);
    }
  };

  const handleChange = (name: string, value: string) => {
    console.log(name);
    setFormValue(prev => ({ ...prev, [name]: value }));
  };

  const fields = [
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
  ];

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title $bigSize >Login</Title>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          {fields.map(field => (
            <TextInputWithLabel key={field.name} {...field} labelInColumn />
          ))}

          <SubmitButton text="Entrar" />
        </Form>

        <FormFooter>
          <a href="/register">Esqueceu sua senha?</a>
          <a href="/register">Não tem uma conta? Crie uma!</a>
        </FormFooter>
      </FormContainer>
    </LoginContainer>
  );
};