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
  const [transactions, setTransactions] = useState<TransactionRaw[]>([]);

  const { monthIndex, year, setLoading } = useContext(HomeContext);

  useEffect(() => {
    async function fetchData() {
      if (monthIndex === null) { return; } 
      setLoading(true);

      const cardQuery = `month=${monthIndex + 1}&year=${year?.getFullYear()}`;
      const transactionQuery = 'limit=5&noInstallments=true';
      
      try {
        const [cardResponse, transactionResponse] = await Promise.all([
          cardsApi.get(cardQuery),
          transactionsApi.get(1, transactionQuery),
        ]);
        
        setCardList(cardResponse);
        setTransactions(transactionResponse.transactions);
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [monthIndex, year, setLoading]);

  return (
    <>
      <Title>Meus cartões</Title>
      <CardList cardList={cardList} />

      <Title>Últimas atualizações</Title>
      <ExtractList list={transactions}/>
    </>
  );
}