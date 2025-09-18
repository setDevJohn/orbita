import styled from 'styled-components';

interface ITextInput {
  $width?: string;
  $size?: string;
}

export const TextInput = styled.input<ITextInput>`
  background-color: ${({ theme }) => theme.lightBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme, $size }) => $size ? `${$size}px` : theme.normalText };
  outline: none;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  padding: 13px 15px;
  width: ${({ $width }) => $width && $width};

  &::placeholder {
    color: #A29F9F;
  }
`;