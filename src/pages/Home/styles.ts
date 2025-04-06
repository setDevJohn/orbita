import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const MainDetails = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 0  0 20px 20px;
  background-color: #1d1d1e;
  padding: 15px;
  min-height: 22vh;
  width: 100%;
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Month = styled.div`
  color: #fff;
  font-size: 14px;
  text-align: center;
  width: 40px;
`;

export const ToggleAccount = styled.div`
  position: relative;
`;

export const CurrentAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 17px;
  margin: 30px 0 0 15px;
  width: 130px;
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
  background-color: aliceblue;
  border-radius: 4px;
  width: 140px;
  padding: ${({ $open }) => $open ? '5px' : '0px'};
  margin: 5px 0 0 10px;
  transition: all 0.4s ease;
  overflow: auto;
  max-height: ${({ $open }) => $open ? '65px' : '0px' };
`;

export const AccountItem = styled.li`
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  padding: 10px 15px; 
  margin-top: 12px;
`;

export const Price = styled.p`
  color: #fff;
  font-size: 28px;
  font-weight: 500;
`;

export const MainContent = styled.main`
  flex: 1;
  overflow: auto;
  width: 100%;
`;

export const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  padding: 10px 15px;
  width: 100%;
`;

export const Card = styled.li<{$details: boolean; $color: string}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ $color }) => $color};;
  border-radius: 10px;
  transition: all 0.4s ease;
  padding: 12px;
  overflow: hidden;
  height: ${({ $details }) => $details ? '157px': '60px' };
  width: 100%;
`;

export const CardHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  width: 100%;
`;

export const IconCardContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 60%);
`;

export const TextCard = styled.p<{$column?: boolean; $name?: boolean}>`
  display: flex;
  font-size: ${({ $name }) => $name ? '18px' : '15px'};
  flex-direction: ${({ $column }) => $column && 'column'};
  gap: 2px;
  color: #fff;
`;

export const TextCardSpan = styled.span`
  font-size: 11px;
`;

export const InvoiceValue = styled.p`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #fff;
  font-size: 20px;
`;

export const InvoiceSpan = styled.span`
  font-size: 12px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
`;

export const RecentExtract = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px ;
`;

export const ExtractCard = styled.li`
  width: 100%;
  height: 65px;
  border-bottom: 2px solid #888;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 45px;
  background-color: #1d1d1e;
  padding: 6px 15px;
  width: 100%;
`;

export const FooterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const FooterIconSpan = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
`;

export const MenuIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 15px -2px #0005;
  transform: translateY(-25px);
  padding: 12px;
  border-radius: 5px;
`;