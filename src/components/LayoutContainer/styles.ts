import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100svh;
  width: 100%;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color1};
  font-size: ${({ theme }) => theme.subtitle};
  padding: 10px 20px;
  border-radius: 0 0 10px 10px;
  height: 60px;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  width: 100%;
  overflow: auto;
`;