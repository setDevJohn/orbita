import styled from 'styled-components';

export const ModalText = styled.p`
  font-size: ${({ theme }) => theme.bigText};
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  padding: 15px 5px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  margin: 20px 0;
`;