import React from 'react';
import styled from 'styled-components';
import FileUploader from './FileUploader';
import { motion } from 'framer-motion';

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background-color: ${({ theme }) => theme.colors.darkBg};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}40`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 2rem auto 0;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const KeyInfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const CryptoForm = ({ 
  file, 
  onFileChange, 
  keyValue, 
  onKeyChange, 
  onSubmit, 
  isProcessing, 
  actionType 
}) => {
  return (
    <FormContainer>
      <FormGroup>
        <label>Select File to {actionType === 'encrypt' ? 'Encrypt' : 'Decrypt'}</label>
        <FileUploader onFileChange={onFileChange} file={file} />
      </FormGroup>
      
      <FormGroup>
        <label>Encryption Key</label>
        <Input 
          type="text"
          placeholder="Enter your encryption key (optional)"
          value={keyValue}
          onChange={onKeyChange}
        />
        <KeyInfoText>
          {actionType === 'encrypt' 
            ? 'You will need this key to decrypt your file later. If left blank, the default key will be used.'
            : 'Enter the same key used for encryption. If left blank, the default key will be used.'}
        </KeyInfoText>
      </FormGroup>
      
      <SubmitButton
        whileTap={{ scale: 0.95 }}
        disabled={isProcessing}
        onClick={onSubmit}
      >
        {isProcessing 
          ? `${actionType === 'encrypt' ? 'Encrypting' : 'Decrypting'}...` 
          : `${actionType === 'encrypt' ? 'Encrypt' : 'Decrypt'} File`}
      </SubmitButton>
    </FormContainer>
  );
};

export default CryptoForm;