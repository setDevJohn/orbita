import styled from 'styled-components';

export const ExtractDate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.contrastColor};
  font-size: ${({ theme }) => theme.smallText};
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.contrastColor};
`;

export const ExtractItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.normalText};
  padding: 0 4px;
  margin-bottom: 2px;
`;

export const ExtractDesc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;