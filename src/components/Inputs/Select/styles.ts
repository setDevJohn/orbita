import styled from 'styled-components';

export const InputContainer = styled.div<{$labelInColumn?: boolean}>`
  display: flex;
  flex-direction: ${({ $labelInColumn }) => $labelInColumn ? 'column' : 'row'};
  align-items: ${({ $labelInColumn }) => !$labelInColumn && 'center'};
  gap: 5px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.normalText};
`;

export const SelectStyled = styled.select<{$darkBackground?: boolean, $minWidth?: string}>`
  background-color: ${({ theme, $darkBackground }) => 
    theme[ $darkBackground ? 'darkBackground' : 'lightBackground']};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  outline: none;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  padding: 13px 15px;
  min-width: ${({ $minWidth }) => $minWidth && $minWidth};
  width: 100%;
`;

export const Option = styled.option`
`;