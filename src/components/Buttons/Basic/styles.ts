import styled, { css, CSSObject } from 'styled-components';

interface IButtonsStyled {
  $type?: 'cancel' | 'confirm';
  $custonStyle?: CSSObject
}

export const ButtonStyled = styled.button<IButtonsStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${({ theme, $type }) =>  (
    $type === 'cancel' 
      ? '#ef4444' : $type === 'confirm' 
        ? '#22c55e' : theme.linearGradient
  )};
  color: #F5F5F5;
  text-align: center;
  font-size: ${({ theme }) => theme.bigText};
  font-weight: 500;
  border: none;
  border-radius: 10px;
  box-shadow: 1px 1px 7px -1px #0004;
  box-shadow: ${({ $type }) => (
    $type === 'cancel' 
      ? '0 4px 6px -1px #ef444433' : $type === 'confirm' 
        ? '0 4px 6px -1px #22c55e33' : '0 4px 6px -1px #0004'
  ) };
  padding: 10px 18px;
  cursor: pointer;
  min-width: 110px;
  transition: transform 0.4s ease;
  
  ${({ $custonStyle }) => css`${$custonStyle}`};

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.9);
  }
`;