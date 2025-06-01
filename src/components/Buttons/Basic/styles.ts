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
    $type === 'cancel' ? '#8b2d23' : $type === 'confirm' ? '#288573' : theme.buttonColor
  )};
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-family: ${({ theme }) => theme.secondaryFont};
  font-size: ${({ theme }) => theme.bigText};
  font-weight: 500;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 7px -1px #0004;
  padding: 8px 20px;
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