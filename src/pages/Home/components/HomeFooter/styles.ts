import styled, { keyframes } from 'styled-components';

export const Footer = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 45px;
  background: ${({ theme }) => theme.lightBackground};
  padding: 7px 15px;
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
  background-color: ${({ theme }) => theme.lightBackground};
  border-radius: 4px;
  padding: 15px 20px;
  animation: ${fadeIn} 0.4s ease;
`;

export const RegisterItem = styled.li`
`;

export const FooterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

export const FooterIconSpan = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.smallSpan};
  font-weight: 400;
`;

export const MenuIcon = styled.div<{$open: boolean}>`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.linearGradient};
  box-shadow: 0px 10px 20px -5px #6366f166;
  transform: translateY(-16px);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-18px) scale(1.05);
    box-shadow: 0 12px 25px -6px #6366f199;
  }
`;

export const Icon = styled.div<{$open: boolean}>`
  transition: all 0.4s ease;
  transform: ${({ $open }) => $open ? 'rotate(45deg)' : 'rotate(0deg)' };
  width: 32px;
  height: 32px;
`;