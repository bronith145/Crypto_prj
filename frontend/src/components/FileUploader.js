import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaFile } from 'react-icons/fa';

const DropzoneContainer = styled.div`
  border: 2px dashed ${({ theme, isDragActive }) => 
    isDragActive ? theme.colors.primary : theme.colors.borderColor};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ theme, isDragActive }) => 
    isDragActive ? `${theme.colors.primary}10` : `${theme.colors.darkBg}80`};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0;
`;

const FileInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${({ theme }) => `${theme.colors.darkBg}80`};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 1rem;
`;

const FileUploader = ({ onFileChange, file }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileChange(acceptedFiles[0]);
    }
  }, [onFileChange]);
  
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  
  const fileRejectionItems = fileRejections.map(({ errors }) => (
    <ErrorMessage key={errors[0].code}>{errors[0].message}</ErrorMessage>
  ));
  
  return (
    <div>
      <DropzoneContainer {...getRootProps({ isDragActive })}>
        <input {...getInputProps()} />
        <UploadIcon>
          <FaCloudUploadAlt />
        </UploadIcon>
        {isDragActive ? (
          <UploadText>Drop the file here...</UploadText>
        ) : (
          <>
            <UploadText>Drag & drop a file here, or click to select</UploadText>
            <UploadSubtext>Any file type is supported</UploadSubtext>
          </>
        )}
      </DropzoneContainer>
      
      {fileRejectionItems}
      
      {file && (
        <FileInfo>
          <FaFile />
          <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
        </FileInfo>
      )}
    </div>
  );
};

export default FileUploader;