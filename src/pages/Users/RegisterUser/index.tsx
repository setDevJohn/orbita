import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { usersApi } from '@services/users';
import { toastError, toastWarn } from '@utils/toast';
import { useState } from 'react';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const RegisterUser = () => {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formValue).some(value => !value)) {
      return toastWarn('Preencha todos os campos!');
    }

    if (formValue.password.length < 8) {
      return toastWarn('A senha deve ter no mínimo 8 caracteres');
    }

    if (formValue.password !== formValue.passwordConfirmation) {
      return toastWarn('As senhas devem ser iguais');
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
    </LoginContainer>
  );
};