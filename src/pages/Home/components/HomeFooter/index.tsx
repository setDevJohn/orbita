import { BasicButton } from '@components/Buttons';
import { HomeContext } from '@context/Home';
import { useContext } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { PiCalendarFill } from 'react-icons/pi';
import { RiFileList3Fill } from 'react-icons/ri';
import { TiHome } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { BackgroundFocus, Footer, FooterIconContainer, FooterIconSpan, Icon, MenuIcon, RegisterItem, RegisterList } from './styles';
export function HomeFooter () {
  const { 
    menuRegister,
    setMenuRegister,
    currentPage,
    setCurrentPage
  } = useContext(HomeContext);

  const navigate = useNavigate();

  const registerMenuItems = [
    { name: 'Receitas', path: '/inicio/registro/receita', icon: <FaArrowTrendUp size={23} fill="#0f0" /> },
    { name: 'Despesas', path: '/inicio/registro/despesa', icon: <FaArrowTrendDown size={23} fill="#f00" /> },
    { name: 'Despesas no crédito', path: '/inicio/registro/despesa-credito', icon: <BsCreditCard size={23} fill="#f00" /> },
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
            {registerMenuItems.map(({ icon, name, path }, i) => (
              <RegisterItem 
                key={i}
                onClick={() => {
                  navigate(path);
                  setMenuRegister(false);
                }}
              >
                <BasicButton text={name} icon={icon} custonStyle={{ background: '#161B22' }} />
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
            ? <TiHome size={32} fill="#000" />
            : <FiPlus size={32} fill="#fff" />
          }
        </Icon>
      </MenuIcon>

      <FooterIconContainer onClick={() => handleChangePage('projection')}>
        <PiCalendarFill size={30} /> 
        <FooterIconSpan>Projeção</FooterIconSpan>
      </FooterIconContainer>
    </Footer>
  );
}