import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px 15px 15px 15px;
  width: 100%;
  overflow: auto;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;
`;

export const Price = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.bigTitle};
  border: none;
  outline: none;
  border-bottom: ${({ theme }) => `2px solid ${theme.contrastColor}`};
  padding-left: 15px;
  max-width: 200px; 
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  border: ${({ theme }) => `${theme.darkBackground} solid 1px`};
  box-shadow: 1px 1px 7px -1px #0009;
  border-radius: 5px;
  padding: 15px;
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
  background: ${({ theme }) => theme.linearGradient};
  padding: 15px 20px;
  width: 100%;
`;
