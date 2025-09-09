import { LoadingPage } from '@components/Loading';
import { AuthContext } from '@context/Auth';
import { toastFire } from '@utils/sweetAlert';
import { useContext, useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { BsBank2 } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { IoNotifications } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { LuSettings } from 'react-icons/lu';
import { MdCategory } from 'react-icons/md';
import { RiCloseLargeFill } from 'react-icons/ri';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Container, FooterSideBar, IconContainer, Item, List, MenuIcon, SideBar } from './styles';

export function Navigation () {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { logout } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelected(pathName);
  }, [location]);
  
  const handleLogout = async () => {
    try {
      setLoading(true);

      await logout();
    } catch (error) {
      toastFire((error as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const list = [
    {  path: '/inicio', label: 'Início', icon: <IoHome size={22}/> },
    {  path: '/perfil', label: 'Perfil', icon: <FaUser size={22}/> },
    {  path: '/contas', label: 'Contas', icon: <BsBank2 size={24}/> },
    {  path: '/cartoes', label: 'Cartões', icon: <BsFillCreditCardFill size={22}/> },
    {  path: '/categorias', label: 'Categorias', icon: <MdCategory size={26}/> },
    {  path: '/notificacoes', label: 'Notificações', icon: <IoNotifications size={26}/> },
  ];

  return (
    <Container>
      <MenuIcon>
        <BiMenuAltRight 
          size={32}
          fill="#fff"
          onClick={() => setSideBar(true)}
        />
      </MenuIcon>

      <SideBar $open={sideBar}>
        <IconContainer>
          <RiCloseLargeFill 
            fill="#fff"
            size={24}
            onClick={() => setSideBar(false)}
          />
        </IconContainer>

        {/* TODO: Limpar context na navegação */}
        <List>
          {list.map(({ icon, path, label }, i) => (
            <Item  
              key={i}
              $active={selected.includes(path)}
              onClick={() => {
                setSelected(path);
                navigate(path);
                setSideBar(false);
              }}
            >
              {icon} {label}
            </Item>
          ))}
        </List>

        <FooterSideBar>
          <Item
            onClick={() => {
              setSelected('/configuracoes');
              navigate('/configuracoes');
              setSideBar(false);
            }}
          >
            Configurações
            <LuSettings size={25}/>
          </Item>

          <Item onClick={handleLogout}>
            Sair
            <LuLogOut size={24}/>
          </Item>
        </FooterSideBar>
      </SideBar>

      <Outlet/>

      {loading && <LoadingPage /> }
    </Container>
  );
}