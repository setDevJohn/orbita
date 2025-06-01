import styled from 'styled-components';

export const CategoriesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 15px 0;
  width: 100%;
`;

export const CategoryCard = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.lightBackground};
  border-radius: 4px;
  padding: 10px 15px;
  width: 100%;
`;

export const CategoryName = styled.p`
  font-size: ${({ theme }) => theme.normalText};
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;