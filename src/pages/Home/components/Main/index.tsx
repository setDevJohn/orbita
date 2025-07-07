import { CardList } from '@components/CardList';
import { ExtractList } from '@components/Extract/List';
import { HomeContext } from '@context/Home';
import { cardsApi } from '@services/cards';
import { CardRaw } from '@services/cards/interface';
import { transactionsApi } from '@services/transactions';
import { TransactionRaw } from '@services/transactions/interfaces';
import { toastError } from '@utils/toast';
import { useContext, useEffect, useState } from 'react';
import { Title } from 'styles/main';

export function MainComponent() {
  const [cardList, setCardList] = useState<CardRaw[]>([]);
  console.log(cardList);
  const [transactions, setTransactions] = useState<TransactionRaw[]>([]);

  const { monthIndex, setLoading } = useContext(HomeContext);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const [cardResponse, transactionResponse] = await Promise.all([
          cardsApi.get(),
          transactionsApi.get(1, `limit=5&month=${monthIndex + 1}`),
        ]);
        
        setCardList(cardResponse);
        setTransactions(transactionResponse);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, [monthIndex, setLoading]);

  return (
    <>
      <CardList cardList={[]} />

      <Title>Últimas transações</Title>

      <ExtractList list={transactions}/>
    </>
  );
}