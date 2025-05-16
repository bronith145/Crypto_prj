import React from 'react';
import styled from 'styled-components';
import { Container, FlexContainer } from './styles/Container.styled';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.darkBg};
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
    }
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FlexContainer justifyContent="space-between" mobileDirection="column" gap="2rem">
            <div>
              <h3>Encrytonator</h3>
              <p>Secure file encryption and decryption for all your needs.</p>
            </div>
            
            <div>
              <h4>Quick Links</h4>
              <ul style={{ listStyleType: 'none' }}>
                <li><FooterLink href="/">Home</FooterLink></li>
                <li><FooterLink href="/about">About</FooterLink></li>
                <li><FooterLink href="/docs">Documentation</FooterLink></li>
              </ul>
            </div>
            
            <div>
              <h4>Connect With Us</h4>
              <SocialIcons>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </SocialIcons>
            </div>
          </FlexContainer>
          
          <Copyright>
            &copy; {new Date().getFullYear()} Encrytonator. All rights reserved.
          </Copyright>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
