import styled from 'styled-components';

export const Title = styled.h1<{$margin?: string}>`
  font-size: ${({ theme }) => theme.subtitle};
  font-weight: 400;
  font-family: ${({ theme }) => theme.secondaryFont};
  margin: ${({ $margin }) => $margin ? $margin : '20px'};
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.normalText};
  color: ${({ theme }) => theme.textColor};
`;

export const InputLabel = styled.label<{$minWidth?: string}>`
  font-size: ${({ theme }) => theme.normalText};
  min-width: ${({ $minWidth }) => $minWidth ? $minWidth : '120px'};
`;

export const Separator = styled.div<{$margin?: number}>`
  width: 100%;
  height: 2px;
  margin: ${({ $margin }) => $margin && `${$margin}px 0`};
  background-color: ${({ theme }) => theme.darkBackground};
`;

export const BackgroundFocus = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0009;
  width: 100%;
  height: 100svh;
`;