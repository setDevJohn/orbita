import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { usersApi } from '@services/users';
import { toastWarn } from '@utils/toast';
import { FormEvent, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const EmailStep = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email) {
        return toastWarn('Informe o e-mail da sua conta');
      }
      const userResponse = await usersApi.sendEmailToRecoverPassword(email);

      navigate(`/recuperar-senha/token?userId=${userResponse.id}`);
    } catch (err) {
      console.error(err);
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
            {...formFields}
            labelInColumn
          />

          <SubmitButton text='Enviar' />
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