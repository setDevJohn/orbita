import { ButtonStyled } from './styles';
interface IBasicButton {
  text: string
  action?: () => void
  type?: 'cancel' | 'confirm'
}
export function BasicButton({ text, action, type }: IBasicButton) {
  return (
    <ButtonStyled 
      type={action ? 'button' : 'submit'}
      onClick={action ? action : () => {}}
      $type={type}
    >
      {text}
    </ButtonStyled>
  );
}