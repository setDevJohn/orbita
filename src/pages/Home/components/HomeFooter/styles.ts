import styled, { keyframes } from 'styled-components';

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
`;

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
  width: 60%;
`;

export const RegisterItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  color: #000;
  font-size: ${({ theme }) => theme.smallText};
  border-radius: 4px;
  box-shadow: 2px 2px 7px -2px #0004;
  min-width: 100%;
`;

export const FooterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const FooterIconSpan = styled.span`
  color: #fff;
  font-size: ${({ theme }) => theme.smallSpan};
  font-weight: 400;
`;

export const MenuIcon = styled.div<{$open: boolean}>`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 15px -2px #0004;
  transform: translateY(-18px);
  padding: ${({ $open }) => $open ? '7px 8px 2px 6px' : '7px 7px 2px 7px'};;
  border-radius: 25%;
`;

export const Icon = styled.div<{$open: boolean}>`
  transition: all 0.4s ease;
  transform: ${({ $open }) => $open ? 'rotate(45deg)' : 'rotate(0deg)' };
`;