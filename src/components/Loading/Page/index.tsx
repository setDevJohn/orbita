import { FaDollarSign } from 'react-icons/fa';
import { BackgroundFocus } from 'styles/main';

import { GrowingIcon } from './styles';

export const LoadingPage = () => (
  <BackgroundFocus>
    <GrowingIcon as={FaDollarSign} />
  </BackgroundFocus>
);