import styled, { keyframes } from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';

// Project imports

import { mediaQuery } from '../../styles/breakpoints';
import { colors, shadows } from '../../styles/theme';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Content = styled.div`
  flex: 1;
  margin: 40px 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`

export const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    text-align: center;
  }

  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }
`

export const InfoContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 8px;
  }

  @media ${mediaQuery.minMd} {
    flex-direction: row;
    justify-content: space-between;
    max-width: 600px;

    & > * + * {
      margin: 0px;
    }
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 8px;
  }
`

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
`

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

export const ReposContent = styled.div`
  margin: 40px 20px 0px;
  width: 80%;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 20px;
  }
`

export const RepoContent = styled.div`
  flex: 1;
  border-radius: 16px;
  background: ${colors.white};
  padding: 8px 16px 16px;
  box-shadow: ${shadows.default};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${shadows.Card};
  }
`

export const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${ ({color}) => color && `${color}` };
`

export const RepoInfoContent = styled.div`
  margin-top: 16px;
  display: flex;

  & > * + * {
    margin-left: 12px;
  }
`

export const StyledArrowBack = styled(AiOutlineArrowLeft).attrs({
  size: '30px',
  color: colors.black
})`
  position: absolute;
  top: 24px;
  left: 24px;
`

export const PaginateButton = styled.button`
  margin-top: 40px;
  padding: 8px 12px;
  height: 40px;
  background: ${colors.green};
  color: ${colors.white};
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;

  font-family: 'Roboto';
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 24px;

  h3 {
    text-align: center;
  }
`
export const StyledErrorMessage = styled.div`
  margin-top: 20px;
  color: ${colors.red};
  font-weight: 700;
  font-family: 'Roboto';
  `
