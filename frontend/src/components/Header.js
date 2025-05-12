import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container, FlexContainer } from './styles/Container.styled';
import { FaLock, FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.darkBg};
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.darkBg};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 10px rgba(0, 0, 0, 0.2)' : 'none')};
  }
`;

const NavLink = styled(Link)`
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.textSecondary)};
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ active }) => (active ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <HeaderContainer>
      <Container>
        <FlexContainer>
          <Logo to="/">
            <FaLock />
            <span>SPECTRA</span>
          </Logo>
          
          <MenuToggle onClick={toggleMenu}>
            <FaBars />
          </MenuToggle>
          
          <NavMenu isOpen={isMenuOpen}>
            <CloseButton onClick={closeMenu}>
              <FaTimes />
            </CloseButton>
            <NavLink to="/" active={location.pathname === '/' ? 1 : 0} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0} onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/docs" active={location.pathname === '/docs' ? 1 : 0} onClick={closeMenu}>
              Documentation
            </NavLink>
          </NavMenu>
        </FlexContainer>
      </Container>
    </HeaderContainer>
  );
};

export default Header;