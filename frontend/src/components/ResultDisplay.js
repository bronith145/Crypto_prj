import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDownload, FaCheck } from 'react-icons/fa';

const ResultCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  max-width: 800px;
  margin: 2rem auto 0;
  text-align: center;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}20`};
    padding: 0.5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const ResultContent = styled.div`
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    
    strong {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ResultDisplay = ({ result, actionType }) => {
  console.log("result: ",result);
  return (
    <ResultCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResultHeader>
        <FaCheck />
        <h3>{actionType === 'encrypt' ? 'Encryption' : 'Decryption'} Successful!</h3>
      </ResultHeader>
      
      <ResultContent>
        <p>
          <strong>Original File:</strong> {result.originalFile}
        </p>
        <p>
          <strong>{actionType === 'encrypt' ? 'Encrypted' : 'Decrypted'} File:</strong> {
            actionType === 'encrypt' ? result.encryptedFile : result.decryptedFile
          }
        </p>
      </ResultContent>
      
      <DownloadButton 
       href={
        result.downloadUrl.startsWith('/output/')
          ? `http://localhost:5000${result.downloadUrl}`
          : `http://localhost:5000/output/${result.downloadUrl.split('\\').pop()}`
      }
        
        download
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaDownload />
        Download {actionType === 'encrypt' ? 'Encrypted' : 'Decrypted'} File
      </DownloadButton>
    </ResultCard>
  );
};

export default ResultDisplay;