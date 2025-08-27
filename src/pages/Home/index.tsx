import { LoadingPage } from '@components/Loading';
import { HomeContext } from '@context/Home';
import { useContext, useEffect, useRef } from 'react';

import { TransactionDetails, MainComponent } from './components';
import { AccountDetails } from './components/AccountDetails';
import { HomeFooter } from './components/HomeFooter';
import { Container, MainContent } from './styles';

export function Home () {
  const { setMonthIndex, setYear, currentPage, loading } = useContext(HomeContext);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.getMonth();
    
    setYear(date);
    setMonthIndex(currentMonth);
  }, [setMonthIndex, setYear]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const selectedComponent = {
    home: <MainComponent />,
    extract: <TransactionDetails type="extract"/>,
    projection: <TransactionDetails type="projection"/>
  };

  return (
    <Container>
      <AccountDetails mainPage={currentPage === 'home'} />

      <MainContent ref={contentRef}>
        {selectedComponent[currentPage]}
      </MainContent>

      <HomeFooter />

      {loading && <LoadingPage />}
    </Container>
  );
}