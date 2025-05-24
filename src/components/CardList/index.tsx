import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { 
  Card, 
  CardFooter, 
  CardHeader,
  CardListContainer,
  IconCardContainer, 
  InvoiceSpan,
  InvoiceValue,
  TextCard,
  TextCardSpan
} from './styles';

export const CardList = () => {
  const [cardIdInDetails, setCardIdInDetails] = useState<number | null>(null);

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

  function handleDetailsCard(id: number) {
    if (cardIdInDetails === id) { return setCardIdInDetails(null); } 
    setCardIdInDetails(id);
  }

  return (
    <CardListContainer>
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
    </CardListContainer>
  );
};