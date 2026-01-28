// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import ThemeRegistry from './theme-registry';

export const metadata = {
  title: 'LinkedIn Feed',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
         <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
