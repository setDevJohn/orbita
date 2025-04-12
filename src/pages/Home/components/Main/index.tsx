import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import {
  Card,
  CardFooter,
  CardHeader,
  CardList,
  IconCardContainer,
  InvoiceSpan,
  InvoiceValue,
  TextCard,
  TextCardSpan,
} from "./styles";
import {
  ExtractDate,
  ExtractDesc,
  ExtractItem,
  ExtractItemContent,
  ExtractList,
  Line,
  RecentExtract
} from "../Extract/styles";
import { Title } from "styles/main";

export function MainComponent() {
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

            <IconCardContainer $details={cardIdInDetails === card.id}>
              <IoMdArrowDropdown size={28} style={{margin: 'auto'}}/>
            </IconCardContainer>
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
                    ? <FaArrowTrendDown size={18} fill="#f00" /> 
                    : <FaArrowTrendUp size={18} fill="#0f0" />
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