import styled from 'styled-components';

export const SubmitStyled = styled.input`
  background: ${({ theme }) => theme.linearGradient};
  color: #F5F5F5;
  font-size: ${({ theme }) => theme.normalText};
  font-family: ${({ theme }) => theme.primaryFont};
  font-weight: 600;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  border: none;
  outline: none;
  cursor: pointer;
`;