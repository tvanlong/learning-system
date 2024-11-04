import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const createOrderCode = () =>
  `DH-${new Date().getTime().toString().slice(-6)}`;
