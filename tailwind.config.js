const MAX_SUPPORTED_UNIT = 320;
const STEP = 0.5;
const REM_PER_UNIT = 0.25;

const generatedExtendedSize = new Array(MAX_SUPPORTED_UNIT / STEP).fill(null).reduce((acc, _, idx) => {
  return {
    ...acc,
    [(idx + 1) * STEP]: `${(idx + 1) * STEP * REM_PER_UNIT}rem`,
  };
}, {});

const extendedSize = {
  ...generatedExtendedSize,
  fit: 'fit-content',
  full: '100%',
  '2/3': '66.67%',
  '3/4': '75%',
  '9/10': '90%',
  '9/16': '56.25%',
  '15/16': `${(15 * 100) / 16}%`,
  '1/2-screen': '50vh',
};

const palette = {
  yellow: '#ffd032',
  orange: '#f28b29',
  green: 'rgb(32, 148, 98)',
  'green-dark-1': '#096a5a',
  'red-dark-1': 'rgb(174, 1, 1)',
  red: '#d71a20',
  'red-light-1': '#ec1f27',
  black: '#212529',
  white: '#fff',
  gray: '#ccc',
  'gray-light-1': '#999',
  'gray-light-3': '#e1e1e1',
  'gray-dark-1': '#666',
  'gray-dark-2': '#2f2f2f',
  'gray-light-2': '#f2f2f2',
  black: '#101010',
  'black-light-1': '#212529',
  lime: '#28c43c',
  blue: '##007bff',
  'blue-light-1': '#80bdff',
  cyan: '#1e94b6',
};

const fontSize = { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '22.4px' };

const fontWeight = {
  bold: 700,
  'semi-bold': 500,
  normal: 400,
};

const fontFamily = {
  normal: 'avantgarde_normalbook',
  medium: 'avantgarde_medium',
  bold: 'avantgardebold',
};

const screens = {
  md: { max: '991px' },
  sm: { max: '767px' },
};

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}', './index.html'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      width: extendedSize,
      height: { ...extendedSize, viewport: 'var(--view-port-height)' },
      maxWidth: extendedSize,
      maxHeight: { ...extendedSize, viewport: 'var(--view-port-height)' },
      minWidth: extendedSize,
      minHeight: { ...extendedSize, viewport: 'var(--view-port-height)' },
      padding: extendedSize,
      paddingTop: extendedSize,
      paddingBottom: extendedSize,
      paddingLeft: extendedSize,
      paddingRight: extendedSize,
      margin: extendedSize,
      marginTop: extendedSize,
      marginBottom: extendedSize,
      marginLeft: extendedSize,
      marginRight: extendedSize,
      fontWeight,
    },
    colors: {
      ...palette,
    },
    fontSize,
    fontFamily,
    screens,
  },
  plugins: [],
};
