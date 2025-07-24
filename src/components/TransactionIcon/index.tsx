import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

import { IconContainer } from './styles';

export const TransactionIcon = ({ type }: {type: 'income' | 'expense'}) => {
  return (
    <IconContainer $operationType={type}>
      {type === 'income' 
        ? <FaArrowTrendUp size={22} fill="#22c55e" /> 
        : <FaArrowTrendDown size={22} fill="#ef4444" />
      }
    </IconContainer>
  );
};