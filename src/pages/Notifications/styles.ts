import styled from 'styled-components';

export const ButtonFilterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 25px;
  margin: 20px 0 25px 0;
`;

export const ButtonFilter = styled.div<{ $select?: boolean }>`
  background: ${({ theme }) => theme.lightBackground};
  padding: 8px 16px;
  border-radius: 5px;
  outline: ${({ $select }) => $select ? '1px solid #334155' : 'none'};
  box-shadow: ${({ $select }) => $select ? '0px 10px 20px -5px #6365F146' : 'none'};
  min-width: 120px;
  text-align: center;
  cursor: pointer;
`;

export const SpanButton = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.contrastColor};
  width: 100%;
  text-align: right;
  margin-bottom: 15px;
`;

export const NoNotificationSpan = styled.span`
  font-size: ${({ theme }) => theme.bigText};
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
`;

export const ListContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Item = styled.li`
  padding: 12px 16px;
  background: ${({ theme }) => theme.lightBackground};  
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.borderColor}`};
  border-radius: 5px;
  gap: 10px;
`;

export const IconLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${({ theme }) => theme.smallText};
  color: ${({ theme }) => theme.textColor};
`;

export const ButtonCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;

  span {
    cursor: pointer;
    color: ${({ theme }) => theme.contrastColor};
    font-size: ${({ theme }) => theme.smallText};
    min-width: 80px;
    text-align: center;
  }
`;