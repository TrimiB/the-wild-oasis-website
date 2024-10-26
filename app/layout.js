import Logo from './components/Logo';
import Navigation from './components/Navigation';

export const metadata = {
  title: 'The wild Oasis',
  description: 'Developed by: Kushtrim Bujupi',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
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
