import styled from 'styled-components';

export const AccountsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 15px 0;
  width: 100%;
`;

export const AccountCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.lightBackground};
  border-radius: 4px;
  padding: 10px 15px;
  width: 100%;
`;

export const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
`;

export const AccountName = styled.p`
  font-size: ${({ theme }) => theme.normalText};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AccountBalance = styled.p`
  font-size: ${({ theme }) => theme.normalText};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;