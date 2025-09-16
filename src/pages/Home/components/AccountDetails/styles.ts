import styled from 'styled-components';

export const Price = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 36px;
  font-weight: 500;
`;

export const Span = styled.span`
  font-size: ${({ theme }) => theme.normalSpan};
`;

export const Month = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  text-align: center;
  width: 77px;
`;

export const MainDetails = styled.section`
  display: flex;
  flex-direction: column;
`;

export const MonthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding-bottom: 8px;

  & > div:nth-child(2) {
    width: 38%;
  }
`;

export const ToggleMonth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 0 0 10px 10px;
  background: ${({ theme }) => theme.lightBackground};
  box-shadow: 1px 2px 10px #0004;
  padding: 10px 15px;
  margin-bottom: 15px;
  width: 100%;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

export const UserLogo = styled.img`
  max-width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 130px);
`;

export const UserSpan = styled.span`
  font-size: ${({ theme }) => theme.smallSpan};
  color: ${({ theme }) => theme.textColor};
`;

export const UserName = styled.p`
  font-size: ${({ theme }) => theme.bigText};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.linearGradient};;
  border-radius: 20px;
  padding: 15px;
  margin: 20px;
`;

export const AccountList = styled.ul<{$open: boolean}>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mainBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  min-width: 160px;
  max-width: 90vw;
  width: max-content;
  margin-top: 4px;
  overflow-y: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: all 0.25s ease-in-out;
  z-index: 10;
  padding: ${({ $open }) => ($open ? '4px 0' : '0')};
`;

export const AccountItem = styled.li`
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.normalText};
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.mainBackground};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.contrastColor};
  }
`;

export const ToggleAccount = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7px;
  width: 100%;
`;

export const CurrentAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  max-width: 90%;
  cursor: pointer;

  p {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;