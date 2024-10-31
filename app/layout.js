import Header from './_components/Header';

import { font_Josefin_Sans } from './_fonts/fonts';

import '@/app/_styles/globals.css';

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
        className={`${font_Josefin_Sans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
        <Header />
        <div className='flex-1 px-8 py-12'>
          <main className='max-w-7xl mx-auto'>{children}</main>
        </div>
      </body>
    </html>
  );
}
