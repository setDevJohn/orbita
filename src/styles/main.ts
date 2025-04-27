import styled from 'styled-components';

export const Title = styled.h2`
  margin: 20px 20px 0 20px;
  font-size: ${({ theme }) => theme.subtitle};
  font-weight: 400;
  font-family: ${({ theme }) => theme.secondaryFont};
`;