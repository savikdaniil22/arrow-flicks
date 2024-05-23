import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArrowFlicks',
  description: 'ArrowFlicks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>ArrowFlicks</title>
        <meta name="description" content="ArrowFlicks" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
