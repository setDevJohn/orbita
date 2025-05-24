import { FaDollarSign } from 'react-icons/fa';

import { BackgroundFocus, GrowingIcon } from './styles';

export const LoadingPage = () => (
  <BackgroundFocus>
    <GrowingIcon as={FaDollarSign} />
  </BackgroundFocus>
);