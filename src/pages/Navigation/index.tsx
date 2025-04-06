import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { Container, FooterSideBar, IconContainer, Item, List, MenuIcon, SideBar } from "./styles";


export function NaviGation () {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname
    setSelected(pathName)
  }, [location]);

  const list = [
    {  path: '/', label: 'Início', icons: <IoHome size={22}/> },
    {  path: '/perfil', label: 'Perfil', icons: <FaUser size={22}/> },
    {  path: '/contas', label: 'Contas', icons: <BsBank2 size={24}/> },
    {  path: '/cartoes', label: 'Cartões', icons: <BsFillCreditCardFill size={22}/> },
    {  path: '/categorias', label: 'Categorias', icons: <MdCategory size={26}/> },
    {  path: '/notificacoes', label: 'Notificações', icons: <IoNotifications size={26}/> },
  ]

  return (
    <Container>
      <MenuIcon>
        <BiMenuAltRight 
          size={35}
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

        <List>
          {list.map(({icons, path, label}, i) => (
            <Item  
              key={i}
              $active={selected === path}
              onClick={() => {
                setSelected(path)
                navigate(path)
              }}
            >
              {icons} {label}
            </Item>
          ))}
        </List>

        <FooterSideBar>
          <Item> Configurações </Item>
          <Item> Sair </Item>
        </FooterSideBar>
      </SideBar>

      <Outlet/>
    </Container>
  )
}