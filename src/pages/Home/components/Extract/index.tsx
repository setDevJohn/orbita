import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { SearchFilter, DateFilter } from "components/Inputs"; 
import { FaArrowTrendDown } from "react-icons/fa6";
import { 
  ButtonContainer,
  ButtonFilter,
  ExtractDate,
  ExtractDesc,
  ExtractItem,
  ExtractItemContent,
  ExtractList,  
  FilterContainer,  
  Line,
  RecentExtract,
  Title
} from "./styles";

export function ExtractComponent() {
  const [typeListFilter, setTypeListFilter] = useState<string>('');

  const extractDateList = [
    { 
      date: '01/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '02/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '03/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '04/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
    { 
      date: '05/04',
      list: [
        {
          name: 'Mesada',
          type: 'in',
          price: 'R$ 25,99'
        },
        {
          name: 'Pizzaria',
          type: 'out',
          price: 'R$ 45,90'
        }
      ]
    },
  ]

  function handleChangeTypeList(type: string) {
    setTypeListFilter(prev => prev === type ? '' : type)
  }

  return (
    <>
      <Title>Extrato</Title>

      <FilterContainer>
        <SearchFilter />
        <DateFilter />
      </FilterContainer>

      <ButtonContainer>
        <ButtonFilter
          type="button"
          $select={typeListFilter === 'revenue'}
          onClick={() => handleChangeTypeList('revenue')}
        >
          <FaArrowTrendUp size={22} fill="#0f0" />
          Receita
        </ButtonFilter>

        <ButtonFilter 
          type="button"
          $select={typeListFilter === 'expense'}
          onClick={() => handleChangeTypeList('expense')}
        >
          <FaArrowTrendDown size={22} fill="#f00" />
          Despesa
        </ButtonFilter>
      </ButtonContainer>

      <RecentExtract>
        {extractDateList.map(({date, list}, i) => (
          <ExtractList key={i}>
            <ExtractItem>
              <ExtractDate> <Line /> {date} </ExtractDate>
              {list.map((item, index) => (
                <ExtractItemContent key={`item-${i}-${index}`}>
                  {item.type === 'out' 
                    ? <FaArrowTrendDown size={18} fill="#f00" /> 
                    : <FaArrowTrendUp size={18} fill="#0f0" />
                  }
                  <ExtractDesc>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </ExtractDesc>
                </ExtractItemContent>
              ))}
            </ExtractItem>
          </ExtractList>
        ))}
      </RecentExtract>
    </>
  )
}