import { CardList } from '@components/CardList';
import { ExtractList } from '@components/Extract/List';
import { LoadingPage } from '@components/Loading';
import { cardsApi } from '@services/cards';
import { CardRaw } from '@services/cards/interface';
import { transactionsApi } from '@services/transactions';
import { toastError } from '@utils/toast';
import { useEffect, useState } from 'react';
import { Title } from 'styles/main';

import { extractDateList } from './extractDateList';

export function MainComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cardList, setCardList] = useState<CardRaw[]>([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const [cardResponse, transactionResponse] = await Promise.all([
          cardsApi.get(),
          transactionsApi.get()
        ]);
        
        setCardList(cardResponse);
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
      <CardList cardList={[]} />

      <Title>Últimas transações</Title>

      <ExtractList list={extractDateList}/>

      {loading && <LoadingPage />}
    </>
  );
}