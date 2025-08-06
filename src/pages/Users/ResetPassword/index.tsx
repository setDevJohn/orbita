import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { useState } from 'react';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   const response = await usersApi.login(formValue);
    //   console.log(response);
    // } catch (err) {
    //   console.error(err);
    //   toastError((err as Error).message);
    // }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title>Recuperação de Senha</Title>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <TextInputWithLabel 
            label='Email'
            type='email'
            name='email'
            placeholder='seuemail@exemplo.com'
            value={email}
            handleChange={(_,value) => setEmail(value)}
            labelInColumn
          />

          <SubmitButton text="Enviar" />
        </Form>

        <FormFooter>
          <span>
            Se existir um cadastro nesse email será enviado um token para redefinição da senha
          </span>
        </FormFooter>
      </FormContainer>
    </LoginContainer>
  );
};