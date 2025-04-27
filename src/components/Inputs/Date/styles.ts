import styled from 'styled-components';

export const DateInput = styled.input`
  display: block;
  font-size: ${({ theme }) => theme.normalText};
  background-color: ${({ theme }) => theme.color2};
  color: #fff;
  outline: none;
  border-radius: 5px;    
  box-shadow: 1px 2px 7px -2px #0004;
  border: none;
  margin: 0 auto;
  padding: 7px 10px;
`;