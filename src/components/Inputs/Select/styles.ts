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

export const SelectStyled = styled.select<{$darkBackground?: boolean}>`
  background-color: ${({ theme, $darkBackground }) => 
    theme[ $darkBackground ? 'darkBackground' : 'lightBackground']};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 1px 1px 7px -1px #0009;
  padding: 10px 15px;
  width: 100%;
`;

export const Option = styled.option`
`;