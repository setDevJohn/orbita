import { ToggleButton } from '@components/Buttons';
import { ReactNode, useState } from 'react';
import { Text } from 'styles/main';

import { DropContainer, Dropdown, ToggleContainer, ToggleDropdownContainer } from './styles';

interface IToggleDropdown {
  text: string;
  children: ReactNode;
  clearToggleStorage?: () => void;
  noAlign?: boolean;
}

export function ToggleDropdown({ 
  text,
  children,
  clearToggleStorage,
  noAlign = false,
}: IToggleDropdown) {
  const [toggleStatus, setToggleStatus] = useState<boolean>(false);

  function handleToggle () {
    setToggleStatus(prev => !prev);
    clearToggleStorage?.();
  }

  return (
    <ToggleDropdownContainer>
      <ToggleContainer>
        <Text>{ text }</Text>
    
        <ToggleButton
          checked={toggleStatus}
          handleClick={handleToggle}
        />
      </ToggleContainer>

      <Dropdown $open={toggleStatus}>
        <DropContainer $noAlign={noAlign}>
          { children }
        </DropContainer>
      </Dropdown>
    </ToggleDropdownContainer>
  );
}