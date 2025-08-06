import styled from 'styled-components';

export const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.darkBackground};
  padding: 1rem;
  height: 100svh;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.mainBackground};
  box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -2px #0000001a;
  border-radius: 20px;
`;

export const FormHeader = styled.header`
  padding: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 15px 30px;
  width: 100%;
`;

export const FormFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  a {
    color: ${({ theme }) => theme.contrastColor};
    text-decoration: none;
    font-size: ${({ theme }) => theme.smallText};
    cursor: pointer;
    margin-top: 10px;
  }

  span {
    width: 100%;
    text-align: center;
    color: #b3b3b3;
  }
`;