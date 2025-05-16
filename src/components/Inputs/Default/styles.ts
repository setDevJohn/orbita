import styled from 'styled-components';

interface ITextInput {
  $width?: string;
}

export const TextInput = styled.input<ITextInput>`
  background-color: ${({ theme }) => theme.darkBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 1px 1px 7px -1px #0009;
  padding: 10px 15px;
  width: ${({ $width }) => $width && $width};

  &::placeholder {
    color: #a29f9f;
  }
`;