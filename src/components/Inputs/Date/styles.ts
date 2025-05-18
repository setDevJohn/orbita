import styled from 'styled-components';

export const DateContainer = styled.div<{$labelInColumn?: boolean}>`
  display: flex;
  flex-direction: ${({ $labelInColumn }) => $labelInColumn ? 'column' : 'row'};
  align-items: ${({ $labelInColumn }) => !$labelInColumn && 'center'};
  gap: 5px;
`;