import { FaDollarSign } from 'react-icons/fa';
import { BackgroundFocus } from 'styles/main';

import { BackgroundColor, GrowingIcon } from './styles';

export const LoadingPage = ({ backgroundColor }: { backgroundColor?: boolean }) => (
  <>
    {backgroundColor && <BackgroundColor />}

    <BackgroundFocus>
      <GrowingIcon as={FaDollarSign} />
    </BackgroundFocus>
  </>
);