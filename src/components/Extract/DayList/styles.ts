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
  gap: 10px;
  background-color: ${({ theme }) => theme.lightBackground};
  font-size: ${({ theme }) => theme.normalText};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const ExtractDesc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  span {
    font-weight: 600;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  span:last-child {
    font-weight: 300;
    font-size: ${({ theme }) => theme.smallText};
  }
`;

export const ExtractValue = styled.span<{ $type: 'income' | 'expense' }>`
  color: ${({ $type }) => $type === 'income' ? '#4ADE80' : '#F85A44'};
`;