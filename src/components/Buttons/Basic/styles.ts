import styled from 'styled-components';

interface IButtonsStyled {
  $type?: 'cancel' | 'confirm';
}

export const ButtonStyled = styled.button<IButtonsStyled>`
  background-color: ${({ theme, $type }) =>  (
    $type === 'cancel' ? '#af1f1f' : $type === 'confirm' ? '#129e12' : theme.color2
  )};
  color: #d0cece;
  text-align: center;
  font-size: ${({ theme }) => theme.normalText};
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 7px -2px #0004;
  padding: 8px 15px;
  min-width: 110px;
  cursor: pointer;
  transition: transform 0.4s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.9);
  }
`;