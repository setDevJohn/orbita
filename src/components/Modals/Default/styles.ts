import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mainBackground};
  border-radius: 4px;
  width: 100%;
  max-width: 90%;
  min-height: 30svh;
  max-height: 90svh;
  overflow: hidden;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.lightBackground};
  font-size: ${({ theme }) => theme.subtitle};
  width: 100%;
  height: 45px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 15px 0;
  width: 100%;
  overflow: auto;
`;