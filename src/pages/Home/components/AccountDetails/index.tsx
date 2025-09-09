import { DateInput } from '@components/Inputs';
import { HomeContext } from '@context/Home';
import { accountsApi } from '@services/accounts';
import { AccountRaw } from '@services/accounts/interface';
import { usersApi } from '@services/users';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { toastFire } from '@utils/sweetAlert';
import { useContext, useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import { 
  AccountContainer,
  AccountItem,
  AccountList,
  ContentContainer,
  CurrentAccount,
  ImageContainer,
  MainDetails,
  Month,
  MonthContainer,
  Price,
  Span,
  ToggleAccount,
  ToggleMonth,
  UserContainer,
  UserLogo,
  UserName,
  UserSpan
} from './styles';

export function AccountDetails ({ mainPage }: { mainPage: boolean }) {
  const [accounts, setAccounts] = useState<AccountRaw[]>([]);

  const { 
    decodedUser,
    setDecodedUser,
    setLoading,
    monthIndex,
    setMonthIndex,
    year,
    setYear,
    customDateFilter,
    setCustomDateFilter,
    accontToggle,
    setAccontToggle,
    selectedAccountId,
    setSelectedAccountId,
  } = useContext(HomeContext);

  const defaultProfileImage = `https://ui-avatars.com/api/?name=${decodedUser?.name}&background=333333&color=ffffff`;

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
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const [accountRes, userRes] = await Promise.all([accountsApi.get(), usersApi.verify()]);

        setAccounts(accountRes);
        setDecodedUser(userRes);

        if (!selectedAccountId) {
          setSelectedAccountId(accountRes[0]?.id ?? null);
        }
      } catch (err) {
        toastFire((err as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedAccountId, setDecodedUser, setLoading, setSelectedAccountId]);

  return (
    <MainDetails>
      <UserContainer>
        <ImageContainer>
          <UserLogo 
            alt="Foto usuário"
            src={decodedUser?.profileImage || defaultProfileImage} 
            onError={(e) => (e.target as HTMLImageElement).src = defaultProfileImage}
          />
        </ImageContainer>

        <ContentContainer>
          <UserSpan>Bem-vindo(a) de volta,</UserSpan>
          <UserName> {decodedUser?.name} </UserName>
        </ContentContainer>
      </UserContainer>

      <MonthContainer>
        <ToggleMonth>
          <IoMdArrowDropleft size={22} onClick={handlePrevMonth}/>

          <Month>{customDateFilter ? format.dateToDayAndMonth(customDateFilter.toISOString()) : months[monthIndex || 0]}</Month>

          <IoMdArrowDropright size={22} onClick={handleNextMonth}/>
        </ToggleMonth>
        
        <DateInput
          mode='year'
          startDate={year}
          handleChange={(date) => setYear(date as Date)}
        />
      </MonthContainer>
    
      {mainPage &&(
        <>
          <AccountContainer>
            <ToggleAccount>
              <CurrentAccount onClick={() => setAccontToggle(prev => !prev)}>
                <p>{accounts.find(({ id }) => id === selectedAccountId)?.name}</p>

                <IoMdArrowDropdown size={22} />
              </CurrentAccount>
              
              <AccountList $open={accontToggle}>
                {accounts.map(({ id, name }) => (
                  <AccountItem key={id} onClick={() => handleSelectAccount(id)}>
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