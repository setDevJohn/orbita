import styled from 'styled-components';

export const ButtonFilter = styled.button<{$select?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.darkBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  border: none;
  border-radius: 5px;
  box-shadow: ${({ $select, theme }) => `2px 2px 7px -1px ${$select ? theme.contrastColor : '#0004'} `};
  padding: 3px 7px;
  min-width: 80px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 22px;
  margin: 15px 0 30px 0;
`;