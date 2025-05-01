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
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
`;

export const Price = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.bigTitle};
  border: none;
  outline: none;
  border-bottom: ${({ theme }) => `2px solid ${theme.color1}`};
  padding-left: 15px;
  margin-left: 12px;
  margin-right: 15px;
  width: 45%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  border: ${({ theme }) => theme.color1} solid 2px;
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  overflow: auto;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.color1};
  padding: 15px 20px;
  width: 100%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  width: 100%;
`;