import { HomeContext } from '@context/Home';
import { accountsApi } from '@services/accounts';
import { AccountRaw } from '@services/accounts/interface';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { toastError } from '@utils/toast';
import { useContext, useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropleft, IoMdArrowDropright, IoMdArrowDropup } from 'react-icons/io';

import { AccountContainer, AccountItem, AccountList, ContentContainer, CurrentAccount, ImageContainer, MainDetails, Month, MonthContainer, Price, Span, ToggleAccount, UserContainer, UserLogo, UserName, UserSpan } from './styles';

export function AccountDetails ({ mainPage }: { mainPage: boolean }) {
  const [accounts, setAccounts] = useState<AccountRaw[]>([]);

  const { 
    setLoading,
    monthIndex,
    setMonthIndex,
    customDateFilter,
    setCustomDateFilter,
    accontToggle,
    setAccontToggle,
    selectedAccountId,
    setSelectedAccountId,
  } = useContext(HomeContext);

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  
  function handlePrevMonth () {
    if(customDateFilter) { return setCustomDateFilter(null); }

    if (!monthIndex) { return setMonthIndex(11); }
    setMonthIndex(prev => (prev || 0) - 1);
  }
  
  function handleNextMonth () {
    if(customDateFilter) { return setCustomDateFilter(null); }

    if (monthIndex === 11) { return setMonthIndex(0); }
    setMonthIndex(prev => (prev || 0)  + 1); 
  }
   
  function handleSelectAccount (id: number) {
    setAccontToggle(false);
    setSelectedAccountId(id);
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
  
        const accounts = await accountsApi.get();
        setAccounts(accounts);

        if (!selectedAccountId) {
          setSelectedAccountId(accounts[0]?.id);
        }
      } catch (err) {
        toastError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [selectedAccountId, setLoading, setSelectedAccountId]);

  return (
    <MainDetails>
      <MonthContainer>
        <IoMdArrowDropleft size={22} onClick={handlePrevMonth}/>

        <Month>{customDateFilter ? format.dateToDayAndMonth(customDateFilter.toISOString()) : months[monthIndex || 0]}</Month>

        <IoMdArrowDropright size={22} onClick={handleNextMonth}/>
      </MonthContainer>
    
      {mainPage &&(
        <>
          <UserContainer>
            <ImageContainer>
              <UserLogo src="https://i.pravatar.cc/60" alt="Foto usuário" />
            </ImageContainer>

            <ContentContainer>
              <UserSpan>Bem-vindo(a) de volta,</UserSpan>
              <UserName>UserName</UserName>
            </ContentContainer>
          </UserContainer>

          <AccountContainer>

            <ToggleAccount>
              <CurrentAccount>
                <p>
                  {accounts.find(({ id }) => id === selectedAccountId)?.name}
                </p>
                { accounts.length > 1 && (
                  <>
                    { accontToggle
                      ? <IoMdArrowDropup size={22} onClick={() => setAccontToggle(false)} />
                      : <IoMdArrowDropdown size={22} onClick={() => setAccontToggle(true)} />
                    }
                  </>
                )}
              </CurrentAccount>
    
              <AccountList $open={accontToggle}>
                {accounts
                  .filter(({ id }) => (id !== selectedAccountId))
                  .map(({ id, name }, i ) => (
                    <AccountItem key={i} onClick={() => handleSelectAccount(id)}>
                      {name}
                    </AccountItem>
                  ))}
              </AccountList>
            </ToggleAccount>
    
            <Price>
              {mask.brlCurrency(accounts.find(({ id }) => id === selectedAccountId)?.balance || '0')}
            </Price>

            <Span>Saldo disponível</Span>
          </AccountContainer>
        </>
      )}
    </MainDetails>
  );
}