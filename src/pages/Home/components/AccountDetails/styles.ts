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
  font-size: ${({ theme }) => theme.normalSpan};
  text-align: center;
  width: 60px;
`;

export const MainDetails = styled.section`
  display: flex;
  flex-direction: column;
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0 0 10px 10px;
  background: ${({ theme }) => theme.lightBackground};
  box-shadow: 1px 2px 10px #0004;
  padding: 19px 15px;
  margin-bottom: 15px;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const UserLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserSpan = styled.span`
  font-size: ${({ theme }) => theme.smallSpan};
  color: ${({ theme }) => theme.textColor};
`;
export const UserName = styled.p`
  font-size: ${({ theme }) => theme.bigText};
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
  left: 0;
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background-color: ${({ theme }) => theme.mainBackground};
  border-radius: 4px;
  min-width: 140px;
  max-width: 200px;
  padding: ${({ $open }) => $open ? '5px 10px' : '0px'};
  transition: all 0.4s ease;
  overflow: auto;
  max-height: ${({ $open }) => $open ? '80px' : '0px' };
`;

export const AccountItem = styled.li`
  background-color: #494c4f;
  padding: 3px;
  border-radius: 3px;
  width: 100%;
`;

export const ToggleAccount = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7px;
`;

export const CurrentAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  max-width: 200px;

  p {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;