import { ToggleButton } from '@components/Buttons';
import { ReactNode, useState } from 'react';
import { Text } from 'styles/main';

import { DropContainer, Dropdown, ToggleContainer, ToggleDropdownContainer } from './styles';

interface IToggleDropdown {
  text: string;
  children: ReactNode;
  clearToggleStorage?: () => void;
}

export function ToggleDropdown({ 
  text,
  children,
  clearToggleStorage
}: IToggleDropdown) {
  const [toggleStatus, setToggleStatus] = useState<boolean>(true);

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
        <DropContainer>
          { children }
        </DropContainer>
      </Dropdown>
    </ToggleDropdownContainer>
  );
}