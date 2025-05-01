import { HomeContext } from '@context/Home';
import { useContext } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { FaArrowTrendDown, FaArrowTrendUp, FaPlus } from 'react-icons/fa6';
import { PiCalendarFill } from 'react-icons/pi';
import { RiFileList3Fill } from 'react-icons/ri';
import { TiHome } from 'react-icons/ti';

import { BackgroundFocus, Footer, FooterIconContainer, FooterIconSpan, Icon, MenuIcon, RegisterItem, RegisterList } from './styles';
export function HomeFooter () {
  const { 
    menuRegister,
    setMenuRegister,
    currentPage,
    setCurrentPage
  } = useContext(HomeContext);

  const registerMenuItems = [
    { name: 'Receitas', path: '', icon: <FaArrowTrendUp size={23} fill="#0f0" /> },
    { name: 'Despesas', path: '', icon: <FaArrowTrendDown size={23} fill="#f00" /> },
    { name: 'Despesas no crédito', path: '', icon: <BsCreditCard size={23} fill="#f00" /> },
  ];

  function handleChangePage(page: 'home' | 'extract' | 'projection') {
    setMenuRegister(false);
    setCurrentPage(page);
  }
  
  function handleMenuRegister() {
    if (currentPage !== 'home') {
      setCurrentPage('home');
    } else {
      setMenuRegister(prev => !prev);
    }
  }

  return (
    <Footer>
      {menuRegister && (
        <BackgroundFocus>
          <RegisterList>
            {registerMenuItems.map((item, i) => (
              <RegisterItem key={i}>
                <span> {item.icon} </span>
                <span> {item.name} </span>
              </RegisterItem>
            ))}
          </RegisterList>
        </BackgroundFocus>
      )}

      <FooterIconContainer onClick={() => handleChangePage('extract')}>
        <RiFileList3Fill size={28}/>
        <FooterIconSpan>Extrato</FooterIconSpan>
      </FooterIconContainer>

      <MenuIcon
        $open={menuRegister}
        onClick={handleMenuRegister}
      >
        <Icon $open={menuRegister}>
          { currentPage !== 'home' 
            ? <TiHome size={28} fill="#000" />
            : <FaPlus size={28} fill="#000" />
          }
        </Icon>
      </MenuIcon>

      <FooterIconContainer onClick={() => handleChangePage('projection')}>
        <PiCalendarFill size={28} /> 
        <FooterIconSpan>Projeção</FooterIconSpan>
      </FooterIconContainer>
    </Footer>
  );
}