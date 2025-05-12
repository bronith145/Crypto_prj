import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, FlexContainer } from '../components/styles/Container.styled';
// import FileUploader from '../components/FileUploader';    
import CryptoForm from '../components/CryptoForm';
import EncryptionAnimation from '../animations/EncryptionAnimation';
import DecryptionAnimation from '../animations/DecryptionAnimation';  //frontend\src\animations\DecryptionAnimation.js+
import ResultDisplay from '../components/ResultDisplay';
import { FaLock, FaUnlock, FaShieldAlt } from 'react-icons/fa';

const HeroSection = styled(Section)`
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 6rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.darkBg} 100%);
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 2.2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 700px;
    margin: 0 auto 2rem;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
`;

const FeaturesSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.darkBg};
`;

const FeatureCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lightBg};
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
  
  h3 {
    margin-bottom: 1rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const CryptoSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.background};
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.colors.text : theme.colors.textSecondary)};
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.borderColor)};
  border-radius: ${({ position }) => 
    position === 'left' ? '0.5rem 0 0 0.5rem' : position === 'right' ? '0 0.5rem 0.5rem 0' : '0'
  };
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.lightBg)};
  }
`;

const AnimationContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  height: 300px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const Home = () => {
  const [activeTab, setActiveTab] = useState('encrypt');
  const [file, setFile] = useState(null);
  const [key, setKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFile(null);
    setResult(null);
    setError(null);
  };
  
  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };
  
  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      if (!file) {
        setError('Please select a file first.');
        return;
      }
      
      setIsProcessing(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('key', key || 'My Name Is Aarti Rathi'); // Use default key if empty
      
      const response = await fetch(`/api/${activeTab}`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while processing the file');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <HeroSection>
        <Container>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Secure Your Files with SPECTRA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SPECTRA is a web tool ensuring your data remains private and secure. Using a Secure Protection via Encrypted Color Transformation & Recursive Armstrong Algorithms.
          </motion.p>
        </Container>
      </HeroSection>
      
      <FeaturesSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose SPECTRA?</h2>
          <FlexContainer justifyContent="space-between" wrap="wrap">
            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 300px' }}
            >
              <FaLock />
              <h3>Strong Encryption</h3>
              <p>Files are encrypted with custom algorithms including Armstrong and Color encryption methods.</p>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 300px' }}
            >
              <FaUnlock />
              <h3>Easy Decryption</h3>
              <p>Decrypt your files with the same key used for encryption, restoring them to their original state.</p>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 300px' }}
            >
              <FaShieldAlt />
              <h3>Secure Key System</h3>
              <p>Use custom keys for personalized security. Your encryption is only as strong as your key.</p>
            </FeatureCard>
          </FlexContainer>
        </Container>
      </FeaturesSection>
      
      <CryptoSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Start Encrypting & Decrypting</h2>
          
          <TabContainer>
            <Tab 
              position="left"
              active={activeTab === 'encrypt'} 
              onClick={() => handleTabChange('encrypt')}
            >
              Encrypt
            </Tab>
            <Tab 
              position="right"
              active={activeTab === 'decrypt'} 
              onClick={() => handleTabChange('decrypt')}
            >
              Decrypt
            </Tab>
          </TabContainer>
          
          <CryptoForm
            file={file}
            onFileChange={handleFileChange}
            keyValue={key}
            onKeyChange={handleKeyChange}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
            actionType={activeTab}
          />
          
          <AnimationContainer show={isProcessing}>
            {activeTab === 'encrypt' ? <EncryptionAnimation /> : <DecryptionAnimation />}
          </AnimationContainer>
          
          {error && (
            <div style={{ color: 'red', textAlign: 'center', margin: '1rem 0' }}>
              {error}
            </div>
          )}
          
          {result && <ResultDisplay result={result} actionType={activeTab} />}
        </Container>
      </CryptoSection>
    </>
  );
};

export default Home;