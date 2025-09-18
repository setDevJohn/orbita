import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

import { IconContainer } from './styles';

interface TransactionIconProps {
  type: 'income' | 'expense';
  size?: 'small' | 'medium';
}

export const TransactionIcon = ({ type, size = 'medium' }: TransactionIconProps) => {
  const iconSize = size === 'small' ? 18 : 22;

  return (
    <IconContainer $operationType={type} $size={size}>
      {type === 'income' 
        ? <FaArrowTrendUp size={iconSize} fill="#22C55E" /> 
        : <FaArrowTrendDown size={iconSize} fill="#EF4444" />
      }
    </IconContainer>
  );
};