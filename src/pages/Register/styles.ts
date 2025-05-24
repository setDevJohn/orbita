import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 15px 0;
  width: 100%;
  overflow: auto;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Separator = styled.div`
  width: 95%;
  height: 2px;
  box-shadow: 1px 1px 7px -1px #0009;
  background-color: ${({ theme }) => theme.darkBackground};
  margin: 30px auto;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  padding: 0 7px;
  width: 100%;
  overflow: auto;
`;

export const DateButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
`;

export const DateButton = styled.div<{$active: boolean}>`
  flex: 1;
  text-align: center;
  background-color: ${({ theme, $active }) => $active ? theme.contrastColor : theme.darkBackground};
  color: ${({ $active, theme }) => $active ? '#000' :theme.textColor};
  border-radius: 4px;
  padding: 4px 2px;
  cursor: pointer;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
`;
