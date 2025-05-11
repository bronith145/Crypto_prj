import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: calc(100vh - 140px); // Account for header and footer
  padding: 2rem 0;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  gap: ${({ gap }) => gap || '1rem'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: ${({ mobileDirection }) => mobileDirection || 'column'};
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || 'repeat(auto-fit, minmax(300px, 1fr))'};
  grid-gap: ${({ gap }) => gap || '1.5rem'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const Section = styled.section`
  padding: 4rem 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 3rem 0;
  }
`;

export const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;