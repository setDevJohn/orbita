import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  height: 100svh;
  width: 100%;
`;

export const MenuIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 1;
`;

export const SideBar = styled.div<{$open: boolean }>`
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: #12688a;
  box-shadow: 0px 0px 10px 4px #0004;
  padding: ${({ $open }) => $open ? '20px 10px' : '0px'};
  transition: all 0.4s ease;
  overflow: hidden;
  height: 100svh;
  width: ${({ $open }) => $open ? '50%' : '0px'};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 25px;
  width: 100%;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const Item = styled.li<{$active?: boolean}>`
  display: flex;
  align-items: center;
  background-color: ${({ $active }) => $active && '#528da4'};
  gap: 10px;
  width: 100%;
  color: #000;
  font-size: 17px;
  border-radius: 5px;
  padding: 5px 15px;
`;

export const FooterSideBar = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;

  li {
    justify-content: end;
  }
`;

