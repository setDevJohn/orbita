import styled, { keyframes } from 'styled-components';

const growFade = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
`;

export const GrowingIcon = styled.div`
  font-size: 70px;
  color: ${({ theme }) => theme.contrastColor};
  animation: ${growFade} 1.5s infinite;
`;
