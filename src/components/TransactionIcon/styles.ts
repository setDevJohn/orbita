import styled from 'styled-components';

export const IconContainer = styled.div<{$operationType: 'income' | 'expense'}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $operationType }) => $operationType === 'income' ? '#22c55e33' : '#ef444433' };
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;