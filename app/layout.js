export const metadata = {
  title: 'The wild Oasis',
  description: 'Developed by: Kushtrim Bujupi',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
