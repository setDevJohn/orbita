import { TransactionRaw } from '@services/transactions/interfaces';
import { mask } from '@utils/mask';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

import { ExtractDate, ExtractDesc, ExtractItemContent, Line } from './styles';

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
            ? <FaArrowTrendDown size={18} fill="#f00" /> 
            : <FaArrowTrendUp size={18} fill="#0f0" />
          }
          <ExtractDesc>
            <span>{item.name}</span>
            <span>{mask.brlCurrency(item.amount)}</span>
          </ExtractDesc>
        </ExtractItemContent>
      ))}
    </>
  );
}