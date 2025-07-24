import { TransactionRaw } from '@services/transactions/interfaces';
import { mask } from '@utils/mask';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

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
          {item.type === 'expense' 
            ? <FaArrowTrendDown size={18} fill="#F87171" /> 
            : <FaArrowTrendUp size={18} fill="#4ADE80" />
          }
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