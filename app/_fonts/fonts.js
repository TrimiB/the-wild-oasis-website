import { Josefin_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const font_Josefin_Sans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const font_GeistMonoVF = localFont({
  src: './GeistMonoVF.woff',
  subssets: ['latin'],
  display: 'swap',
});
// console.log(font_GeistMonoVF);
