import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100svh;
  width: 100%;
`;

export const MainDetails = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 0  0 20px 20px;
  background-color: ${({ theme }) => theme.color1};
  padding: 10px;
  width: 100%;
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Month = styled.div`
  color: #fff;
  font-size: 14px;
  text-align: center;
  width: 40px;
`;

export const ToggleAccount = styled.div`
  position: relative;
`;

export const CurrentAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 17px;
  margin: 30px 0 0 15px;
  width: 130px;
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
  background-color: aliceblue;
  border-radius: 4px;
  width: 140px;
  padding: ${({ $open }) => $open ? '5px' : '0px'};
  margin: 5px 0 0 10px;
  transition: all 0.4s ease;
  overflow: auto;
  max-height: ${({ $open }) => $open ? '65px' : '0px' };
`;

export const AccountItem = styled.li`
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  padding: 10px 15px; 
  margin-top: 12px;
`;

export const Price = styled.p`
  color: #fff;
  font-size: 28px;
  font-weight: 500;
`;

export const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  width: 100%;
`;

export const Footer = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 45px;
  background-color: #1d1d1e;
  padding: 4px 15px;
  width: 100%;
`;

const fadeIn = keyframes`
  from {
    scale: 0.8;
  };
  to {
    scale: 1;
  }
`

export const BackgroundFocus = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  background-color: #0009;
  transform: translateY(-100%);
  padding: 35px 25px;
  width: 100%;
  height: 100svh;
`;

export const RegisterList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  animation: ${fadeIn} 0.4s ease;
  min-width: 50%;
`;

export const RegisterItem = styled.li`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #000;
  font-size: 17px;
`;

export const FooterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const FooterIconSpan = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
`;

export const MenuIcon = styled.div<{$open: boolean}>`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d0d0d0;
  box-shadow: 0px 0px 15px -2px #0004;
  transform: translateY(-18px);
  padding: ${({ $open }) => $open ? '7px 8px 2px 6px' : '7px 7px 2px 7px'};;
  border-radius: 25%;
`;

export const Icon = styled.div<{$open: boolean}>`
  transition: all 0.4s ease;
  transform: ${({ $open }) => $open ? 'rotate(45deg)' : 'rotate(0deg)' };
`;