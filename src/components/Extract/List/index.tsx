import { TransactionRaw } from '@services/transactions/interfaces';
import { format } from '@utils/format';

import { ExtractDayList } from '../DayList';

import { List, ExtractItem, RecentExtract } from './styles';

interface IExtractList {
  list: TransactionRaw[] 
}

export function ExtractList({ list }: IExtractList) {
  const extractFormated = list.reduce((acc, item) => {
    const dateKey = format.dateToDayAndMonth(item.transactionDate); 

    if (!acc[dateKey]) { 
      acc[dateKey] = [];
    }

    acc[dateKey].push(item);

    return acc;
  }, {} as { [key: string]: TransactionRaw[] });

  const extractDateList = Object.keys(extractFormated).map((key) => ({
    date: key,
    list: extractFormated[key],
  }));

  return (
    <RecentExtract>
      {extractDateList.map((extract, i) => (
        <List key={i}>
          <ExtractItem>
            <ExtractDayList extract={extract}/>
          </ExtractItem>
        </List>
      ))}
    </RecentExtract>
  );
}