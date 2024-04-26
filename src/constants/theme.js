import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#6B66FF',
  accent: '#66FFCC',

  success: '#4CAF50', // Green shade
  error: '#FF5252',   // Red shade

  black: '#333333',
  white: '#FFFFFF',
  background: '#EFC276',
};

export const SIZES = {
  base: 12,
  width,
  height,
  h1: 32,
  h2: 24,
  h3: 18,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,
  radius: 8,
};
