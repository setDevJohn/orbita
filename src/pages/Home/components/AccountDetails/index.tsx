import { HomeContext } from '@context/Home';
import { useContext } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { IoMdArrowDropdown, IoMdArrowDropleft, IoMdArrowDropright, IoMdArrowDropup } from 'react-icons/io';
import { RiEyeCloseFill } from 'react-icons/ri';

import { AccountItem, AccountList, CurrentAccount, MainDetails, Month, MonthContainer, Price, PriceContainer, ToggleAccount } from './styles';

export function AccountDetails () {
  const { 
    monthIndex,
    setMonthIndex,
    accontToggle,
    setAccontToggle,
    selectedAccountId,
    setSelectedAccountId,
    showPrice,
    setShowPrice,
  } = useContext(HomeContext);

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Maio',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  
  const accountList = [
    { id: 1, name: 'Principal', value: '500,00'  },
    { id: 2, name: 'Poupança', value: '400,00'  },
    { id: 3, name: 'Investimentos', value: '300,99'  },
  ];
  
  function handlePrevMonth () {
    if (!monthIndex) { return setMonthIndex(11); }
    setMonthIndex(prev => prev - 1);
  }
  
  function handleNextMonth () {
    if (monthIndex === 11) { return setMonthIndex(0); }
    setMonthIndex(prev => prev + 1); 
  }
  
  function handleSelectAccount (id: number) {
    setAccontToggle(false);
    setSelectedAccountId(id);
  }

  return (
    <MainDetails>
      <MonthContainer>
        <IoMdArrowDropleft size={22} onClick={handlePrevMonth}/>
        <Month>{months[monthIndex]}</Month>
        <IoMdArrowDropright size={22} onClick={handleNextMonth}/>
      </MonthContainer>
    
      <ToggleAccount>
        <CurrentAccount>
          {accountList.find(({ id }) => id === selectedAccountId)?.name}
          { accontToggle
            ? <IoMdArrowDropup size={22} onClick={() => setAccontToggle(false)} />
            : <IoMdArrowDropdown size={22} onClick={() => setAccontToggle(true)} />
          }
        </CurrentAccount>
    
        <AccountList $open={accontToggle}>
          {accountList
            .filter(({ id }) => (id !== selectedAccountId))
            .map(({ id, name }, i ) => (
              <AccountItem key={i} onClick={() => handleSelectAccount(id)}>
                {name}
              </AccountItem>
            ))}
        </AccountList>
      </ToggleAccount>
    
      <PriceContainer>
        <Price>
          {'R$ '}
          {showPrice
            ? accountList.find(({ id }) => id === selectedAccountId)?.value 
            : '.....'
          }
        </Price>
    
        {showPrice
          ? <BsFillEyeFill size={22} onClick={() => setShowPrice(false)} />
          : <RiEyeCloseFill size={22} onClick={() => setShowPrice(true)} />
        }
      </PriceContainer>
    </MainDetails>
  );
}