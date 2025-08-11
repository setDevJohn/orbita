import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { toastError } from '@utils/toast';
import { FormEvent, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

type SubmitType = 'password' | 'email' | 'token'

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    passwordConfirmation: ''
  });
  
  const [emailSent, setEmailSent] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, type: SubmitType) => {
    e.preventDefault();

    try {
      if (type === 'email') {
        setEmailSent(true);
      } else if (type === 'token') {
        setVerifiedToken(true);
      } else {
        setEmailSent(false);
        setVerifiedToken(false);
      }
    } catch (err) {
      console.error(err);
      toastError((err as Error).message);
    }
  };

  const forms = {
    email: {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'seuemail@exemplo.com',
      value: email,
      handleChange: (_: string, value: string) => setEmail(value),
    },
    token: {
      label: 'Token',
      type: 'text',
      name: 'token',
      placeholder: '-  -  -  -  -  -',
      value: token,
      handleChange: (_: string, value: string) => setToken(value),
    },
    password: [
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
    ]
  };

  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <IoArrowBackOutline
            size={27}
            fill='#ffffff'
            onClick={() => window.location.href = '/login'}
            style={{
              position: 'absolute',
              top: '31px',
              left: '-10px',
              cursor: 'pointer'
            }}
          />
          <Title>Recuperação de Senha</Title>
        </FormHeader>

        <Form onSubmit={(e) => handleSubmit(e, verifiedToken ? 'password' : !emailSent ? 'email' : 'token')}>
          {!verifiedToken ? (
            <TextInputWithLabel
              { ...(!emailSent ? forms.email : forms.token) }
              labelInColumn
            />
          ) : (
            <>
              {forms.password.map((fields, i) => (
                <TextInputWithLabel
                  key={i}
                  { ...fields }
                  labelInColumn
                />  
              ))}
            </>
          )}

          <SubmitButton text={verifiedToken ? 'Redefinir' : !emailSent ? 'Enviar' : 'Confirmar'} />
        </Form>

        {!verifiedToken &&(
          <FormFooter>
            <span>
              {
                !emailSent
                  ? 'Se existir um cadastro nesse email será enviado um token para redefinição da senha'
                  : 'Utilize o token enviado por email para redefinição da senha'
              }
            </span>
          </FormFooter>
        )}
      </FormContainer>
    </LoginContainer>
  );
};