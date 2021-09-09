import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      200: '#ffc98c',
      500: '#ff9720',
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: `Rubik, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      },
    },
  },
});
