import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  button {
    font-family: ${({ theme }) => theme.fonts.main};
    cursor: pointer;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.colors.darkBg};
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;