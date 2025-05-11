import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFile, FaLock, FaUnlock, FaKey } from 'react-icons/fa';
import { GiCogLock } from 'react-icons/gi';

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Pipeline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  margin-top: 2rem;
`;

const Line = styled.div`
  height: 4px;
  flex-grow: 1;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.secondary} 0%, 
    ${({ theme }) => theme.colors.accent} 100%
  );
  margin: 0 1rem;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.8) 50%, 
      transparent 100%
    );
    animation: shine 1.5s linear infinite;
  }
  
  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Icon = styled(motion.div)`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightBg};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  
  svg {
    font-size: 2rem;
    color: ${({ theme, color }) => color || theme.colors.secondary};
  }
`;

const ProcessText = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ByteParticles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ByteParticle = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DecryptionAnimation = () => {
  // Locked file icon animation
  const fileVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        repeatDelay: 1
      }
    }
  };

  // Key icon animation
  const keyVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, -15, 0, 15, 0],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        repeatDelay: 0.5
      }
    }
  };

  // Process animation (cog)
  const processVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: -360,  // Reversed direction for decryption
      transition: { 
        repeat: Infinity, 
        duration: 3,
        ease: "linear"
      }
    }
  };

  // Unlock animation
  const unlockVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -5, 0],
      transition: { 
        repeat: Infinity, 
        duration: 1.5,
        repeatDelay: 0.5
      }
    }
  };

  // Generate random byte particles
  const particles = Array.from({ length: 15 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase();
    return (
      <ByteParticle
        key={i}
        initial={{ 
          x: Math.random() * 400 + 200, 
          y: Math.random() * 200 + 50,
          opacity: 0 
        }}
        animate={{ 
          x: [null, Math.random() * 300, Math.random() * 100 + 150],
          y: [null, Math.random() * 150 + 100],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatDelay: Math.random() * 2
        }}
      >
        {randomHex}
      </ByteParticle>
    );
  });

  return (
    <AnimationContainer>
      <ByteParticles>
        {particles}
      </ByteParticles>
      
      <Pipeline>
        <Icon
          variants={fileVariants}
          initial="initial"
          animate="animate"
        >
          <FaLock />
        </Icon>
        
        <Line />
        
        <Icon
          variants={keyVariants}
          initial="initial"
          animate="animate"
        >
          <FaKey />
        </Icon>
        
        <Line />
        
        <Icon
          variants={processVariants}
          initial="initial"
          animate="animate"
        >
          <GiCogLock />
        </Icon>
        
        <Line />
        
        <Icon
          variants={unlockVariants}
          initial="initial"
          animate="animate"
        >
          <FaUnlock />
        </Icon>
      </Pipeline>
      
      <ProcessText>Decrypting your file...</ProcessText>
    </AnimationContainer>
  );
};

export default DecryptionAnimation;