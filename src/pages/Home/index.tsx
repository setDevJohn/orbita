import { useEffect, useState } from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { PiCalendarFill } from "react-icons/pi";
import { RiFileList3Fill } from "react-icons/ri";
import { AccountItem, AccountList, Card, CardFooter, CardHeader, CardList, Container, CurrentAccount, ExtractCard, Footer, FooterIconContainer, FooterIconSpan, IconCardContainer, InvoiceSpan, InvoiceValue, MainContent, MainDetails, MenuIcon, Month, MonthContainer, Price, PriceContainer, RecentExtract, TextCard, TextCardSpan, ToggleAccount } from "./styles";

export function Home () {
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const [accontToggle, setAccontToggle] = useState<boolean>(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number>(1);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [cardIdInDetails, setCardIdInDetails] = useState<number | null>(null);

  useEffect(() => {
    const date = new Date()
    const currentMonth = date.getMonth()
    setMonthIndex(currentMonth)
  }, []);

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Maio',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  const accountList = [
    { id: 1, name: 'Principal', value: '500,00'  },
    { id: 2, name: 'Poupança', value: '400,00'  },
    { id: 3, name: 'Investimentos', value: '300,99'  },
  ]

  function handlePrevMonth () {
    if (!monthIndex) return setMonthIndex(11)
    setMonthIndex(prev => prev - 1)
  }

  function handleNextMonth () {
    if (monthIndex === 11) return setMonthIndex(0)
    setMonthIndex(prev => prev + 1) 
  }

  function handleSelectAccount (id: number) {
    setAccontToggle(false)
    setSelectedAccountId(id)
  }

  function handleDetailsCard(id: number) {
    if (cardIdInDetails === id) return setCardIdInDetails(null) 
    setCardIdInDetails(id)
  }

  const cardList = [
    { 
      id: 1,
      name: 'nuBank',
      limit: '1000,00',
      invoice: '1500,00',
      color: '#820AD1',
      closing: '26',
      dueDate: '30',
    },
    { 
      id: 2,
      name: 'C6',
      limit: '1200,00',
      invoice: '1000,00',
      color: '#121212',
      closing: '24',
      dueDate: '28',
    },
    { 
      id: 3,
      name: 'Mercado Pago',
      limit: '2000,00',
      invoice: '890,50',
      color: '#009EE3',
      closing: '20',
      dueDate: '25',
    },
  ]

  return (
    <Container>
      <MainDetails>
        <MonthContainer>
          <IoMdArrowDropleft fill="#fff" size={26} onClick={handlePrevMonth}/>
          <Month>{months[monthIndex]}</Month>
          <IoMdArrowDropright fill="#fff" size={26} onClick={handleNextMonth}/>
        </MonthContainer>

        <ToggleAccount>
          <CurrentAccount>
            {accountList.find(({id}) => id === selectedAccountId)?.name}
            { accontToggle
              ? <IoMdArrowDropup size={22} onClick={() => setAccontToggle(false)} />
              : <IoMdArrowDropdown size={22} onClick={() => setAccontToggle(true)} />
            }
          </CurrentAccount>

          <AccountList $open={accontToggle}>
            {accountList
              .filter(({id}) => (id !== selectedAccountId))
              .map(({id, name}, i ) => (
                <AccountItem key={i} onClick={() => handleSelectAccount(id)}>
                  {name}
                </AccountItem>
              ))}
          </AccountList>
        </ToggleAccount>

        <PriceContainer>
          <Price>
            {'R$ '}
            {showPrice 
              ? accountList.find(({id}) => id === selectedAccountId)?.value 
              : '.....'
            }
          </Price>

          {showPrice
            ? <BsFillEyeFill fill="#fff" size={24} onClick={() => setShowPrice(false)} />
            : <RiEyeCloseFill fill="#fff" size={24} onClick={() => setShowPrice(true)} />
          }
        </PriceContainer>
      </MainDetails>
      
      <MainContent>
          <CardList>
            {cardList.map(card => (
              <Card 
                key={card.id}
                $color={card.color}
                $details={cardIdInDetails === card.id}
                onClick={() => handleDetailsCard(card.id)}
              >
                <CardHeader>
                  <TextCard $name>{card.name}</TextCard>
                  <TextCard $column>
                    <TextCardSpan>limite disponível</TextCardSpan> {`R$ ${card.limit}`}
                  </TextCard>

                  { cardIdInDetails !== card.id && (
                      <IconCardContainer>
                        <IoMdArrowDropdown size={28} style={{margin: 'auto'}}/>
                      </IconCardContainer>
                    )
                  }
                </CardHeader>

                <InvoiceValue>
                  {`R$ ${card.invoice}`}
                  <InvoiceSpan>
                    fatura aberta
                  </InvoiceSpan>
                </InvoiceValue>

                <CardFooter>
                  <TextCard $column>
                    {`dia ${card.closing}`}
                    <TextCardSpan>fechamento</TextCardSpan>
                  </TextCard>

                  <TextCard $column>
                    {`dia ${card.dueDate}`}
                    <TextCardSpan>vencimento</TextCardSpan>
                  </TextCard>
                </CardFooter>
              </Card>
            ))}
          </CardList>

          <RecentExtract>
            <ExtractCard></ExtractCard>
            <ExtractCard></ExtractCard>
            <ExtractCard></ExtractCard>
          </RecentExtract>
      </MainContent>

      <Footer>
        <FooterIconContainer>
          <RiFileList3Fill fill="#fff" size={30}/>

          <FooterIconSpan>Extrato</FooterIconSpan>
        </FooterIconContainer>

        <MenuIcon><FaPlus size={30}/></MenuIcon>

        <FooterIconContainer>
          <PiCalendarFill fill="#fff" size={30} /> 

          <FooterIconSpan>Projeção</FooterIconSpan>
        </FooterIconContainer>
      </Footer>
    </Container>
  )
}