import styled from 'styled-components';

export const IconContainer = styled.div<{
  $operationType: 'income' | 'expense';
  $size: 'small' | 'medium'
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $operationType }) => $operationType === 'income' ? '#22C55E33' : '#EF444433' };
  border-radius: 50%;
  width: ${({ $size }) => $size === 'small' ? '28px' : '42px'};
  height: ${({ $size }) => $size === 'small' ? '28px' : '42px'};
`;