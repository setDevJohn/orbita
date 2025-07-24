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
  margin-bottom: 30px;
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
  margin-bottom: 15px;
  width: 100%;
  overflow: hidden;
`;

export const DateButton = styled.div<{$active: boolean}>`
  flex: 1;
  text-align: center;
  background-color: ${({ theme, $active }) => $active ? theme.contrastColor : theme.darkBackground};
  color: ${({ theme }) => theme.textColor};
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
`;
