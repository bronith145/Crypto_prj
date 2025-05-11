import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
// import Documentation from './pages/Documentation';
import { AppContainer } from './components/styles/Container.styled';

const theme = {
  colors: {
    primary: '#2a8af3',
    secondary: '#e83c69',
    accent: '#7b2efc',
    background: '#091227',
    darkBg: '#050a18',
    lightBg: '#0e1c3d',
    text: '#ffffff',
    textSecondary: '#a3b1cc',
    borderColor: '#1e2a4a'
  },
  fonts: {
    main: "'Poppins', sans-serif",
    mono: "'Source Code Pro', monospace"
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px'
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/docs" element={<Documentation />} /> */}
          </Routes>
        </AppContainer>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;