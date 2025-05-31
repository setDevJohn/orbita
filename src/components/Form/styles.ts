import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px 0 30px 0;
  width: 100%;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;

  button {
    margin-top: 20px;
  }
`;

export const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.secondaryFont};
  font-size: ${({ theme }) => theme.bigTitle};
  font-weight: 400;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;