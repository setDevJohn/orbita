import { CardRaw } from '@services/cards/interface';
import { mask } from '@utils/mask';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';

import { 
  Card, 
  CardFooter, 
  CardHeader,
  CardListContainer,
  EditBackgroundFocus,
  IconCardContainer, 
  // InvoiceSpan,
  // InvoiceValue',
  TextCard,
  TextCardSpan
} from './styles';

interface ICardList {
  cardList: CardRaw[];
  editMode?: boolean;
  editFunction?: (card: CardRaw) => void
  removeFunction?: (card: CardRaw) => void
}

export const CardList = ({ 
  cardList,
  editMode,
  editFunction,
  removeFunction
}: ICardList) => {
  const [cardIdInDetails, setCardIdInDetails] = useState<number | null>(null);
  
  function handleDetailsCard(id: number) {
    if (cardIdInDetails === id) { return setCardIdInDetails(null); } 
    setCardIdInDetails(id);
  }

  { /* TODO: Calcular cores de cartõtes  */ }
  { /* TODO: Calcular cores de contrastes  */ }
  return (
    <CardListContainer>
      {cardList.map(card => (
        <Card
          key={card.id}
          $details={cardIdInDetails === card.id}
          onClick={() => handleDetailsCard(card.id)}
        >
          <CardHeader>
            <TextCard $name>{card.name}</TextCard>
            <TextCard $column>
              <TextCardSpan>limite disponível</TextCardSpan> 
              {mask.brlCurrency(card.creditLimit.toString())}
            </TextCard>
          </CardHeader>

          {/* TODO: Adicionar campo para fatura */}
          {/* <InvoiceValue>
            {`R$ ${card.invoice}`}
            <InvoiceSpan>
                fatura aberta
            </InvoiceSpan>
          </InvoiceValue> */}

          <CardFooter>
            <TextCard $column>
              <TextCardSpan>fechamento</TextCardSpan>
              {`dia ${card.closingDay.toString().padStart(2, '0')}`}
            </TextCard>

            <TextCard $column>
              <TextCardSpan>vencimento</TextCardSpan>
              {`dia ${card.dueDay.toString().padStart(2, '0')}`}
            </TextCard>
          </CardFooter>

          <IconCardContainer $details={cardIdInDetails === card.id}>
            <IoMdArrowDropdown size={28} style={{ margin: 'auto' }}/>
          </IconCardContainer>

          <EditBackgroundFocus $open={cardIdInDetails === card.id && !!editMode}>
            {editFunction && (
              <FaEdit size={30} onClick={(e) => {
                e.stopPropagation();
                editFunction(card);
                setCardIdInDetails(null);
              }}/>
            )}

            {removeFunction && (
              <IoTrashOutline size={30} onClick={(e) => {
                e.stopPropagation();
                removeFunction(card);
                setCardIdInDetails(null);
              }}/>
            )}
          </EditBackgroundFocus>
        </Card>
      ))}
    </CardListContainer>
  );
};