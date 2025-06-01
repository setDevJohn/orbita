import { RiCloseLargeFill } from 'react-icons/ri';
import { BackgroundFocus } from 'styles/main';

import { Content, ModalContainer, ModalHeader } from './styles';

interface IDefaultModal {
  children: React.ReactNode;
  closeModal?: () => void;
  title?: string;
}

export const DefaultModal = ({ children, closeModal, title }: IDefaultModal) => {
  return (
    <BackgroundFocus>
      <ModalContainer>
        {closeModal && (
          <RiCloseLargeFill
            size={22}
            onClick={closeModal}
            style={{ 
              position: 'absolute',
              top: 10,
              right: 10,
              cursor: 'pointer'
            }}
          />
        )}

        {title && (
          <ModalHeader>{title}</ModalHeader>
        )}

        <Content>{children}</Content>
      </ModalContainer>
    </BackgroundFocus>
  );
};