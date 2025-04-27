import styled from 'styled-components';

export const ExtractDate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #888;
  font-size: ${({ theme }) => theme.normalSpan};
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #888;
`;

export const ExtractItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.smallText};
  padding: 0 4px;
  margin-bottom: 2px;
`;

export const ExtractDesc = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ExtractList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const ExtractItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 10px;
  margin: 10px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 22px;
  margin-bottom: 15px;
`;

export const ButtonFilter = styled.button<{$select?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.color4};
  color: #fff;
  font-size: ${({ theme }) => theme.normalText};
  border: none;
  border-radius: 5px;
  outline: ${({ $select }) => $select ? 'solid 1px #1d1d1e' : 'none'};
  box-shadow: 1px 2px 7px -2px #0004;
  padding: 3px 7px;
  min-width: 80px;
`;

export const RecentExtract = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px 20px 23px 20px;
`;