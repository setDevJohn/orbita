import { useEffect, useState } from 'react';
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

export function NaviGation () {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelected(pathName);
  }, [location]);

  const list = [
    {  path: '/inicio', label: 'Início', icon: (active: boolean) => <IoHome size={22} fill={active ? '#000' : '#fff'}/> },
    {  path: '/perfil', label: 'Perfil', icon: (active: boolean) => <FaUser size={22} fill={active ? '#000' : '#fff'}/> },
    {  path: '/contas', label: 'Contas', icon: (active: boolean) => <BsBank2 size={24} fill={active ? '#000' : '#fff'}/> },
    {  path: '/cartoes', label: 'Cartões', icon: (active: boolean) => <BsFillCreditCardFill size={22} fill={active ? '#000' : '#fff'}/> },
    {  path: '/categorias', label: 'Categorias', icon: (active: boolean) => <MdCategory size={26} fill={active ? '#000' : '#fff'}/> },
    {  path: '/notificacoes', label: 'Notificações', icon: (active: boolean) => <IoNotifications size={26} fill={active ? '#000' : '#fff'}/> },
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
              {icon(selected.includes(path))} {label}
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

          <Item
            onClick={() => {
              window.alert('Sair da conta');
            }}
          >
            Sair
            <LuLogOut size={24}/>
          </Item>
        </FooterSideBar>
      </SideBar>

      <Outlet/>
    </Container>
  );
}