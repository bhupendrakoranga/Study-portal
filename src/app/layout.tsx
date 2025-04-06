import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import './globals.css';
import theme from './theme';
import GlobalContextProvider from '@/context/globalcontext/GlobalContextProvider';
import { ReactQueryClientProvider } from '@/context/ReactQueryClientProvider';
import ToastProvider from '@/context/ToastProvider';

export const metadata: Metadata = {
  title: 'BrainyMate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ReactQueryClientProvider>
            <ToastProvider>
              <GlobalContextProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              </GlobalContextProvider>
            </ToastProvider>
          </ReactQueryClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
