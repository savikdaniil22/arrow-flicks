'use client';

import { createTheme, MantineThemeOverride, MantineTheme, rem } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  fontFamily: "'Inter', sans-serif",
  components: {
    Pagination: {
      styles: (theme: MantineTheme) => ({
        control: {
          fontWeight: 400,
          fontSize: rem(16),
        },
        dots: {
          display: 'none',
        },
      }),
    },
  },
});
