import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
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