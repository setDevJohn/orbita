import { CardList } from '@components/CardList';
import { ExtractList } from '@components/Extract/List';
import { cardsApi } from '@services/cards';
import { ICardsResponse } from '@services/cards/interface';
import { toastError } from '@utils/toast';
import { useEffect, useState } from 'react';
import { Title } from 'styles/main';

import { extractDateList } from './extractDateList';

export function MainComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cardList, setCardList] = useState<ICardsResponse[]>([]);

  console.log(loading);
  console.log(cardList);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const response = await cardsApi.get();
        setCardList(response);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  return (
    <>
      <CardList />

      <Title>Últimas transações</Title>

      <ExtractList list={extractDateList}/>
    </>
  );
}