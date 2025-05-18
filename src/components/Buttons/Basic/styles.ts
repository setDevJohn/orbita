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
  background-color: ${({ theme, $type }) =>  (
    $type === 'cancel' ? '#b43426' : $type === 'confirm' ? '#288573' : theme.darkBackground
  )};
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-size: ${({ theme }) => theme.normalText};
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 7px -1px #0004;
  padding: 8px 15px;
  min-width: 110px;
  cursor: pointer;
  transition: transform 0.4s ease;
  
  ${({ $custonStyle }) => css`${$custonStyle}`};

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.9);
  }
`;