import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Project imports

import { colors, shadows } from '../../styles/theme';
import { H3 } from '../../styles/fonts';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  flex: 1;
  margin: 40px 15%;
  animation: ${fadeUp} 0.25s;
`;

export const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
`;

export const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 350px;
  height: 40px;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid ${colors.grayLighter};
  box-shadow: ${shadows.default};
  transition: background 0.2s;
  font-size: 16px;

  ${({ isError }) => isError && `
    border: 1px solid ${colors.red};
  `}

  &::placeholder {
    font-size: 16px;
    color: ${colors.gray};
  }
`;

export const Button = styled.button`
  margin-left: 8px;
  border-radius: 8px;
  border: none;
  width: 60px;
  height: 48px;
  background: ${colors.green};
  box-shadow: ${shadows.default};
  transition: background 0.2s;

  ${({ isError }) => isError && `
    background: ${colors.red};
  `}

  &:disabled {
    background: ${colors.gray};
  }
`;

export const RepositoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const RepositoryContainer = styled(Link)`
  flex: 1 1 250px;
  max-width: 564px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;

  background: ${colors.whiteDarker};
  margin: 64px 32px 0px;
  padding: 16px 0px 20px;
  border-radius: 16px;

  box-shadow: ${shadows.default};
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: box-shadow 0.2s;
  animation: ${fadeUp} 0.25s;

  img {
    width: 78px;
    height: 78px;
    margin-bottom: 8px;
    border-radius: 50%;
  }

  span {
    margin: 0px 8px;
    text-align: center;
  }

  &:hover {
    box-shadow: ${shadows.Card};
  }
`;

export const StyledErrorMessage = styled.div`
  margin-top: 20px;
  color: ${colors.red};
  font-weight: 700;
  font-family: 'Roboto';
  `;

export const DeleteOrganizationButton = styled.button.attrs({
  type: 'submit',
})`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${colors.red};
  border: none;
`;

export const EmptyRepositoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  animation: ${fadeUp} 0.25s;
`;

export const EmptyRepositoryText = styled(H3)`
  margin-top: 40px;
  color: ${colors.gray};
  text-align: center;
`;
