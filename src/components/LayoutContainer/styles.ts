import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100svh;
  width: 100%;
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.linearGradient};
  font-size: ${({ theme }) => theme.subtitle};
  padding: 10px 20px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 6px 2px #0004;
  height: 60px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.subtitle};
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 400;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  width: 100%;
  overflow: auto;
`;