import styled from 'styled-components';

export const SearchInput = styled.input`
  display: block;
  background-color: ${({ theme }) => theme.color2};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.normalText};
  outline: none;
  border-radius: 5px;      
  box-shadow: 2px 2px 7px -2px #0004;
  border: none;
  margin: 0 auto;
  padding:7px 10px;
  width: 93%;
`;