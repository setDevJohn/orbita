import styled from 'styled-components';

export const ButtonFilter = styled.button<{$select?: boolean, $operationType?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.lightBackground};
  color: ${({ $operationType }) => $operationType === 'income' ? '#22C55E' : '#EF4444'};
  font-size: ${({ theme }) => theme.normalText};
  font-weight: 600;
  border: none;
  outline: ${({ $select }) => $select ? '1px solid #334155' : 'none'};
  box-shadow: ${({ $select }) => $select ? '0px 10px 20px -5px #6365F146' : 'none'};
  border-radius: 10px;
  padding: 15px;
  min-width: 80px;
  width: 100%;
  max-width: 37%;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 22px;
  margin: 15px 0 35px 0;
`;