import styled from 'styled-components';

export const ToggleDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  width: 100%;
`;

export const Dropdown = styled.div<{$open: boolean }>`	
  background-color: ${({ theme }) => theme.color2};
  max-height: ${({ $open }) => $open ? '300px' : '0px'};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.4s ease;
  width: 100%;
`;

export const DropContainer = styled.div<{$noAlign: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $noAlign }) => $noAlign ? 'unset' : 'center'};
  margin: 18px 8px;
`;