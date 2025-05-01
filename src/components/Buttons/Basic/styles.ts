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
    $type === 'cancel' ? '#af1f1f' : $type === 'confirm' ? '#129e12' : theme.color2
  )};
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-size: ${({ theme }) => theme.normalText};
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 7px -2px #0004;
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