import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Project imports

import { colors, shadows } from '../../styles/theme';


export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  flex: 1;
  margin: 40px 15%;
`;

export const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 420px;
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

  ${ ({ isError }) => isError && `
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

  ${ ({ isError }) => isError && `
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
  margin: 64px 32px 0px;
  flex: 1 1 250px;
  height: 140px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: ${shadows.default};
  align-items: center;
  background: ${colors.whiteDarker};
  cursor: pointer;

  img {
    width: 78px;
    height: 78px;
    margin-bottom: 8px;
  }
`;