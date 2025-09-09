import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { LoadingPage } from '@components/Loading';
import { AuthContext } from '@context/Auth';
import { toastFire } from '@utils/sweetAlert';
import { useContext, useState } from 'react';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from '../styles';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formValue).some(value => !value)) {
      return toastFire('Preencha todos os campos!', 'warning');
    }

    if (formValue.password.length < 6) {
      return toastFire('A senha deve ter no mínimo 6 caracteres', 'warning');
    }

    try {
      setLoading(true);

      await login(formValue);
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
          <a href="/recuperar-senha">Esqueceu sua senha?</a>
          <a href="/registrar">Não tem uma conta? Crie uma!</a>
        </FormFooter>
      </FormContainer>

      {loading && <LoadingPage />}
    </LoginContainer>
  );
};