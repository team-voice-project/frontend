import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  body {
    overflow-x: hidden;
  }

  ol, ul, li {
    list-style-type: none;
  }
  
  button {
    cursor: pointer;
  }
  
  input {
    outline: none;
  }
  
  textarea {
    font-family: inherit;
    resize: none;
    outline: none;
  }
 
  @media screen and (min-width: 768px) {
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
      border-radius: 10px;
    }

    ::-webkit-scrollbar {
      width: 6px;
      background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #aaa;
    }
  }

`;

export default GlobalStyles;
