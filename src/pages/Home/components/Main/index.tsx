import { ExtractList } from '@components/Extract/List';
import { cardsApi } from '@services/cards';
import { ICardsResponse } from '@services/cards/interface';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Title } from 'styles/main';

import { extractDateList } from './extractDateList';
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
} from './styles';

export function MainComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cardList, setCardList] = useState<ICardsResponse[]>([]);
  const [cardIdInDetails, setCardIdInDetails] = useState<number | null>(null);

  console.log(loading);
  console.log(cardList);
   
  function handleDetailsCard(id: number) {
    if (cardIdInDetails === id) { return setCardIdInDetails(null); } 
    setCardIdInDetails(id);
  }

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const response = await cardsApi.get();
        setCardList(response);
      } catch (err) {
        console.error((err as Error).message);
        // toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  const temporaryCardList = [
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
  ];

  return (
    <>
      <CardList>
        {temporaryCardList.map(card => (
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
              <IoMdArrowDropdown size={28} style={{ margin: 'auto' }}/>
            </IconCardContainer>
          </Card>
        ))}
      </CardList>

      <Title>Últimas transações</Title>

      <ExtractList list={extractDateList}/>
    </>
  );
}