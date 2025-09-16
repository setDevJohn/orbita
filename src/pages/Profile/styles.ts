import styled from 'styled-components';

export const EditBackgroundFocus = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background: #0009;
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-top: 20px;
  width: 100px;
  height: 100px;
  overflow: hidden;

  &:hover > ${EditBackgroundFocus} { opacity: 1; }
`;

export const UserLogo = styled.img`
  max-width: 100%;
`;  