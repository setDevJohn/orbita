import { useState } from "react";
import { Container, FooterSideBar, IconContainer, Item, List, MenuIcon, SideBar } from "./styles";
import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { Outlet } from "react-router-dom";


export function NaviGation () {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const list = [
    { name: 'profile', label: 'Perfil', icons: <FaUser size={22}/> },
    { name: 'accounts', label: 'Contas', icons: <BsBank2 size={24}/> },
    { name: 'cards', label: 'Cartões', icons: <BsFillCreditCardFill size={22}/> },
    { name: 'categories', label: 'Categorias', icons: <MdCategory size={26}/> },
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
          {list.map(({icons, name, label}, i) => (
            <Item  
              key={i}
              $active={selected === name}
              onClick={() => setSelected(name)}
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