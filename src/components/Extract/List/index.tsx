import { ExtractDayList, IExtract } from '../DayList';

import { List, ExtractItem, RecentExtract } from './styles';

interface IExtractList {
  list: IExtract[] 
}

export function ExtractList({ list }: IExtractList) {
  return (
    <RecentExtract>
      {list.map((extract, i) => (
        <List key={i}>
          <ExtractItem>
            <ExtractDayList extract={extract}/>
          </ExtractItem>
        </List>
      ))}
    </RecentExtract>
  );
}