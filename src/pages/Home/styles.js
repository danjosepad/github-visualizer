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
  font-size: 16px;

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
  flex: 1 1 250px;
  max-width: 564px;
  display: flex;
  flex-direction: column;

  background: ${colors.whiteDarker};
  margin: 64px 32px 0px;
  padding: 16px 0px 20px;
  border-radius: 16px;

  box-shadow: ${shadows.default};
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: box-shadow 0.2s;

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
