import styled from 'styled-components';

export const SettingsSection = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  font-size: ${({ theme }) => theme.normalText};
  padding: 5px 10px;
`;

export const IconLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TitleContainer = styled.div`
  margin-top: 35px;
  width: 100%;
`;