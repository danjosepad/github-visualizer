import { colors } from './theme';
import styled from 'styled-components';

export const H1 = styled.h1`
  font-size: 36px;
  color: ${({ color }) => color ? color : colors.grayDark};
`;

export const H2 = styled.h2`
  font-size: 28px;
  color: ${({ color }) => color ? color : colors.white};
`;

export const H3 = styled.h3`
  font-size: 24px;
  line-height: 32px;
  color: ${({ color }) => color ? color : colors.white};
`;

export const H4 = styled.h4`
  font-size: 16px;
  line-height: 28px;
  color: ${({ color }) => color ? color : colors.black};
`;

export const Span = styled.span`
  font-size: 14px;
  line-height: 16px;
  color: ${({ color }) => color ? color : colors.white};
`;