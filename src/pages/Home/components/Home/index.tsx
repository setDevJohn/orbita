import { useState } from "react";
import { Card, CardFooter, CardHeader, CardList, ExtractDate, ExtractDesc, ExtractItem, ExtractItemContent, ExtractList,  IconCardContainer, InvoiceSpan, InvoiceValue, Line, RecentExtract, TextCard, TextCardSpan, Title } from "./styles";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";

export function HomeComponent() {
  const [cardIdInDetails, setCardIdInDetails] = useState<number | null>(null);

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

  const extractDateList = [
    { 
      date: '01/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '02/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '03/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '04/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '05/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
  ]

  return (
    <>
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

      <Title>Últimas transações</Title>

      <RecentExtract>
        {extractDateList.map(({date, list}, i) => (
          <ExtractList key={i}>
            <ExtractItem>
              <ExtractDate> <Line /> {date} </ExtractDate>
              {list.map((item, index) => (
                <ExtractItemContent key={`item-${i}-${index}`}>
                  {item.type === 'out' 
                    ? <CiInboxOut size={30} fill="#f00" /> 
                    : <CiInboxIn size={30} fill="#0f0" />
                  }
                  <ExtractDesc>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </ExtractDesc>
                </ExtractItemContent>
              ))}
            </ExtractItem>
          </ExtractList>
        ))}
      </RecentExtract>
    </>
  )
}