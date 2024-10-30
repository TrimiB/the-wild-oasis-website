import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';

import '@/app/_styles/globals.css';

import { font_Josefin_Sans } from './_fonts/fonts';

export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'The Wild Oasis',
  },
  description:
    'Luxuriour cabin hotel, located in the heart of the italian Dolomities. Surrounded by the most beautiful nature and dark forests. The perfect place for your next relaxation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${font_Josefin_Sans.className} bg-primary-950 text-primary-100 min-h-screen`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>&copy; The Wild Oasis</footer>
      </body>
    </html>
  );
}
