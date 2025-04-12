import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.textColor};
  }
  
  html {
    font-family: ${({ theme }) => theme.primaryFont};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;