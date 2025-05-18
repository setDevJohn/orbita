import { ToggleButton } from '@components/Buttons';
import { ReactNode, useState } from 'react';
import { CSSObject } from 'styled-components';
import { Text } from 'styles/main';

import { DropContainer, Dropdown, Separator, ToggleContainer, ToggleDropdownContainer } from './styles';

interface IToggleDropdown {
  text: string;
  children: ReactNode;
  clearToggleStorage?: () => void;
  noAlign?: boolean;
  customStyle?: CSSObject;
}

export function ToggleDropdown({ 
  text,
  children,
  clearToggleStorage,
  noAlign = false,
  customStyle
}: IToggleDropdown) {
  const [toggleStatus, setToggleStatus] = useState<boolean>(false);

  function handleToggle () {
    setToggleStatus(prev => !prev);
    clearToggleStorage?.();
  }

  return (
    <ToggleDropdownContainer $customStyle={customStyle}>
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

      <Separator />
    </ToggleDropdownContainer>
  );
}