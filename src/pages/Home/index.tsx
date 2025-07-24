import { LoadingPage } from '@components/Loading';
import { HomeContext } from '@context/Home';
import { useContext, useEffect, useRef } from 'react';

import { ExtractComponent, MainComponent, ProjectionComponent } from './components';
import { AccountDetails } from './components/AccountDetails';
import { HomeFooter } from './components/HomeFooter';
import { Container, MainContent } from './styles';

export function Home () {
  const { setMonthIndex, currentPage, loading } = useContext(HomeContext);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const date = new Date();
    const currentMonth = date.getMonth();
    setMonthIndex(currentMonth);
  }, [setMonthIndex]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const selectedComponent = {
    home: <MainComponent />,
    extract: <ExtractComponent/>,
    projection: <ProjectionComponent/>
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