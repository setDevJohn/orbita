import { BasicButton } from '@components/Buttons';

import { DefaultModal } from '../Default';

import { ButtonContainer, ModalText } from './styles';

interface IConfirmationModal {
  text: string;
  cancelAction: () => void
  confirmAction: () => void
}

export const ConfirmationModal = ({ text, cancelAction,  confirmAction  }: IConfirmationModal) => {
  return (
    <DefaultModal title='Confirmação'>
      <ModalText>{text}</ModalText>

      <ButtonContainer>
        <BasicButton
          text='Cancelar'
          action={cancelAction}
        />
        <BasicButton
          text='Confirmar'
          type="cancel"
          action={confirmAction}
        />
      </ButtonContainer>
    </DefaultModal>
  );
};