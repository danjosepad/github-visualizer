// reference: https://material-ui.com

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px'
};

export const mediaQuery = {
  minXs: `(min-width: ${breakpoints.xs})`,
  maxXs: `(max-width: ${breakpoints.xs})`,
  minSm: `(min-width: ${breakpoints.sm})`,
  maxSm: `(max-width: ${breakpoints.sm})`,
  minMd: `(min-width: ${breakpoints.md})`,
  maxMd: `(max-width: ${breakpoints.md})`,
  minLg: `(min-width: ${breakpoints.lg})`,
  maxLg: `(max-width: ${breakpoints.lg})`,
  minXl: `(min-width: ${breakpoints.xl})`,
  maxXl: `(max-width: ${breakpoints.xl})`
};