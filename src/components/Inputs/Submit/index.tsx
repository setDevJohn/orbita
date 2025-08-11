import { SubmitStyled } from './styles';

interface SubmitButtonProps {
  text: string; 
}

export const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <SubmitStyled type="submit" value={text} />
  );
};