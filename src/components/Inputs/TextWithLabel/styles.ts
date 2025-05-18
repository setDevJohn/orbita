import styled from 'styled-components';

export const InputContainer = styled.div<{$labelInColumn?: boolean}>`
  display: flex;
  flex-direction: ${({ $labelInColumn }) => $labelInColumn ? 'column' : 'row'};
  align-items: ${({ $labelInColumn }) => !$labelInColumn && 'center'};
  gap: 5px;
  max-width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.normalText};
`;
