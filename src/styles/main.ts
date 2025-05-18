import styled from 'styled-components';

export const Title = styled.h1`
  margin: 20px;
  font-size: ${({ theme }) => theme.subtitle};
  font-weight: 400;
  font-family: ${({ theme }) => theme.secondaryFont};
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.normalText};
  color: ${({ theme }) => theme.textColor};
`;

export const InputLabel = styled.label<{$minWidth?: string}>`
  font-size: ${({ theme }) => theme.normalText};
  min-width: ${({ $minWidth }) => $minWidth ? $minWidth : '120px'};
`;