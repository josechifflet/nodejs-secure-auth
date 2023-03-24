import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import 'focus-visible/dist/focus-visible';
import '../styles/globals.css';

import type { ThemeOverride } from '@chakra-ui/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';

import AuthRoute from '../components/AuthRoute';
import store from '../store';
import routes from '../utils/routes';

/**
 * Fallback fonts, just in case.
 */
const fallbackFonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

/**
 * All protected routes that require authentication.
 */
const protectedRoutes = [
  routes.profile,
  routes.drafts,
  routes.groups,
  routes.students,
];

/**
 * Default listeners for router events.
 */
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/**
 * App is used to handle all of the requests toward my server.
 *
 * @param Props - Component from Next.js's request.
 * @returns React Functional Component
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ChakraProvider
        resetCSS
        theme={extendTheme({
          styles: {
            global: (props) => ({
              body: {
                bg: mode('#f3f3f3', 'gray.800')(props),
              },
            }),
          },

          // Override default fonts.
          fonts: {
            body: `Inter, ${fallbackFonts}`,
            heading: `Nunito, ${fallbackFonts}`,
          },

          // Set default to light mode and use system color.
          config: {
            initialColorMode: 'system',
            useSystemColorMode: true,
            disableTransitionOnChange: false,
          },
        } as ThemeOverride)}
      >
        <AuthRoute authRoutes={protectedRoutes}>
          <Component {...pageProps} />
        </AuthRoute>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
