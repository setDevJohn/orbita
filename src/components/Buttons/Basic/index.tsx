import { JSX } from 'react';
import { CSSObject } from 'styled-components';

import { ButtonStyled } from './styles';
interface IBasicButton {
  text?: string
  action?: () => void
  type?: 'cancel' | 'confirm'
  icon?: JSX.Element
  custonStyle?: CSSObject
}
export function BasicButton({ text, action, type, icon, custonStyle }: IBasicButton) {
  return (
    <ButtonStyled 
      type={action ? 'button' : 'submit'}
      onClick={action ? action : () => {}}
      $type={type}
      $custonStyle={custonStyle}
    >
      {icon}
      {text}
    </ButtonStyled>
  );
}