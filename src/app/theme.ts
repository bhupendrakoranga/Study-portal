'use client';
import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});

export default theme;
