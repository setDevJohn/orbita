import styled from 'styled-components';

export const Price = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.subtitle};
  font-weight: 500;
`;

export const Month = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalSpan};
  text-align: center;
  width: 60px;
`;

export const MainDetails = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: ${({ theme }) => theme.linearGradient};
  box-shadow: 1px 2px 10px #0004;
  padding: 10px;
  margin: 10px;
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AccountList = styled.ul<{$open: boolean}>`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background-color: ${({ theme }) => theme.mainBackground};
  border-radius: 4px;
  min-width: 140px;
  max-width: 200px;
  padding: ${({ $open }) => $open ? '5px 10px' : '0px'};
  margin: 5px 0 0 10px;
  transition: all 0.4s ease;
  overflow: auto;
  max-height: ${({ $open }) => $open ? '65px' : '0px' };
`;

export const AccountItem = styled.li`
  background-color: #494c4f;
  padding: 3px;
  border-radius: 3px;
`;

export const ToggleAccount = styled.div`
  position: relative;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  padding: 10px 15px; 
  margin-top: 12px;
`;

export const CurrentAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  margin: 30px 0 0 15px;
  min-width: 130px;
  max-width: 200px;
`;