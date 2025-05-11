import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, FlexContainer, Card } from '../components/styles/Container.styled';  
import { FaShieldAlt, FaUserLock, FaBrain } from 'react-icons/fa';

const AboutSection = styled(Section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.darkBg} 100%);
`;

const AboutCard = styled(Card)`
  padding: 2rem;
  display: flex;  
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
`;

const TeamSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.darkBg};
`;

const TeamMember = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
    border: 3px solid ${({ theme }) => theme.colors.primary};
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p.title {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  p.bio {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const AlgorithmCard = styled(Card)`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  ul {
    margin-top: 1rem;
    list-style-position: inside;
    
    li {
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  return (
    <>
      <AboutSection>
        <Container>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            About CryptoGuard
          </motion.h1>
          
          <FlexContainer justifyContent="space-between" wrap="wrap" gap="2rem">
            <AboutCard
              as={motion.div}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.2, duration: 0.5 }
                })
              }}
              style={{ flex: '1 1 300px' }}
            >
              <FaShieldAlt />
              <h3>Our Mission</h3>
              <p>
                At CryptoGuard, we're dedicated to providing accessible encryption tools 
                that empower individuals and organizations to protect their sensitive data 
                with enterprise-grade security.
              </p>
            </AboutCard>
            
            <AboutCard
              as={motion.div}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={1}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.2, duration: 0.5 }
                })
              }}
              style={{ flex: '1 1 300px' }}
            >
              <FaUserLock />
              <h3>Privacy First</h3>
              <p>
                We believe privacy is a fundamental right. Our encryption processes happen 
                locally in your browser, ensuring your files never leave your device unprotected.
              </p>
            </AboutCard>
            
            <AboutCard
              as={motion.div}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={2}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.2, duration: 0.5 }
                })
              }}
              style={{ flex: '1 1 300px' }}
            >
              <FaBrain />
              <h3>Our Approach</h3>
              <p>
                We combine innovative cryptographic algorithms with a user-friendly interface 
                to make powerful encryption accessible to everyone, regardless of technical expertise.
              </p>
            </AboutCard>
          </FlexContainer>
        </Container>
      </AboutSection>
      
      <Section>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Encryption Algorithms</h2>
          
          <FlexContainer direction="column" gap="2rem">
            <AlgorithmCard
              as={motion.div}
              {...fadeInUp}
              viewport={{ once: true }}
            >
              <h3>Armstrong Method</h3>
              <p>
                Named after mathematical Armstrong numbers, this algorithm uses a sliding window approach 
                to encrypt data by applying mathematical transformations based on the encryption key:
              </p>
              <ul>
                <li>Each byte of data is transformed using a digit from the numeric key</li>
                <li>Robust against basic frequency analysis attacks</li>
                <li>Provides fast encryption and decryption operations</li>
              </ul>
            </AlgorithmCard>
            
            <AlgorithmCard
              as={motion.div}
              {...fadeInUp}
              viewport={{ once: true }}
            >
              <h3>Color Encryption</h3>
              <p>
                A unique approach that treats data as color values, inspired by RGB color encoding:
              </p>
              <ul>
                <li>Converts the encryption key into RGB color components</li>
                <li>Breaks data into nibbles (half-bytes) for fine-grained processing</li>
                <li>Creates a complex byte-level transformation that's difficult to reverse without the key</li>
              </ul>
            </AlgorithmCard>
            
            <AlgorithmCard
              as={motion.div}
              {...fadeInUp}
              viewport={{ once: true }}
            >
              <h3>Combined Approach</h3>
              <p>
                CryptoGuard applies both algorithms in sequence to provide layered security:
              </p>
              <ul>
                <li>Data first passes through the Armstrong encryption</li>
                <li>The result is then encrypted using the Color method</li>
                <li>This two-step process significantly increases the encryption strength</li>
                <li>Decryption reverses the process, applying the algorithms in reverse order</li>
              </ul>
            </AlgorithmCard>
          </FlexContainer>
        </Container>
      </Section>
      
      <TeamSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Team</h2>
          
          <FlexContainer wrap="wrap" gap="2rem" justifyContent="center">
            <TeamMember
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 300px', maxWidth: '350px' }}
            >
              <img src="/api/placeholder/200/200" alt="Team member placeholder" />
              <h3>Aarti Rathi</h3>
              <p className="title">Founder & Lead Developer</p>
              <p className="bio">
                Cryptography expert with a passion for building secure applications. 
                Created the core algorithms behind CryptoGuard.
              </p>
            </TeamMember>
            
            <TeamMember
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 300px', maxWidth: '350px' }}
            >
              <img src="/api/placeholder/200/200" alt="Team member placeholder" />
              <h3>Alex Thompson</h3>
              <p className="title">UI/UX Designer</p>
              <p className="bio">
                Design specialist focused on creating intuitive user experiences 
                that make complex security concepts accessible.
              </p>
            </TeamMember>
            
            <TeamMember
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 300px', maxWidth: '350px' }}
            >
              <img src="/api/placeholder/200/200" alt="Team member placeholder" />
              <h3>Sarah Chen</h3>
              <p className="title">Security Researcher</p>
              <p className="bio">
                Cybersecurity expert responsible for testing and ensuring the 
                integrity of our encryption methods.
              </p>
            </TeamMember>
          </FlexContainer>
        </Container>
      </TeamSection>
    </>
  );
};

export default About;