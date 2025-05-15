import styled from "styled-components";

export const StyledH1 = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #2c3e50;
  margin: 2rem 0;
`;

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
`;

export const LinkedinLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3f4f6;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  color: #0077b5;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  i {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #e0e7ff;
    transform: translateY(-2px);
  }
`;
