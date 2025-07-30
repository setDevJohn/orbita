import { SubmitButton, TextInputWithLabel } from '@components/Inputs';
import { Title } from 'styles/main';

import { Form, FormContainer, FormFooter, FormHeader, LoginContainer } from './styles';

export const Login = () => {
  return (
    <LoginContainer>
      <FormContainer>
        <FormHeader>
          <Title $bigSize>Login</Title>
        </FormHeader>

        <Form>
          <TextInputWithLabel 
            label="Email"
            placeholder="seuemail@exemplo.com"
            name="email"
            value=""  
            handleChange={() => {}}
            labelInColumn
          />

          <TextInputWithLabel 
            label="Senha"
            placeholder="***********"
            name="password"
            value=""  
            handleChange={() => {}}
            labelInColumn
          />

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