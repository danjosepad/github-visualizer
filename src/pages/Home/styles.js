import styled from 'styled-components';
import { H1 } from '../../styles/fonts';
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

  &::placeholder {
    font-size: 16px;
    color: ${colors.gray};
  }
`

export const Button = styled.button`
  margin-left: 8px;
  border-radius: 8px;
  border: none;
  width: 60px;
  height: 48px;
  background: ${colors.green};
  box-shadow: ${shadows.default};
`