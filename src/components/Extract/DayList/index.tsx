import { TransactionIcon } from '@components/TransactionIcon';
import { TransactionRaw } from '@services/transactions/interfaces';
import { mask } from '@utils/mask';

import { ExtractDate, ExtractDesc, ExtractItemContent, ExtractValue, Line, NameContainer } from './styles';

export interface IExtract { 
  date: string;
  list: TransactionRaw[]
}

interface IExtractDayList {
  extract: IExtract
}
export function ExtractDayList({ extract: { date, list } }: IExtractDayList) {
  return (
    <>
      <ExtractDate> <Line /> {date} </ExtractDate>

      {list.map((item, index) => (
        <ExtractItemContent key={`item-${index}`}>
          <TransactionIcon type={item.type} size='small' /> 

          <ExtractDesc>
            <NameContainer>
              <span>{item.name}</span>
              <span>{item.categories?.name}</span>
            </NameContainer>

            <ExtractValue $type={item.type}>
              {mask.brlCurrency(item.amount)}
            </ExtractValue>
          </ExtractDesc>
        </ExtractItemContent>
      ))}
    </>
  );
}