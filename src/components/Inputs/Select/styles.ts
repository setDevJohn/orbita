import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.normalText};
`;

export const SelectStyled = styled.select`
  background-color: #0001;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 2px 2px 8px -1px #0009;
  padding: 10px 15px;
`;

export const Option = styled.option`
`;