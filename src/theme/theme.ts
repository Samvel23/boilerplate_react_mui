import { createTheme } from "@mui/material/styles";

import { colors } from "./colors";
import { typography } from "./typography";

export const themeModes = {
  light: "light",
  dark: "dark",
} as const;

export type TThemeMode = (typeof themeModes)[keyof typeof themeModes];

export const createAppTheme = (mode: TThemeMode) => {
  const palette = colors[mode];

  return createTheme({
    palette: {
      mode,
      primary: palette.primary,
      background: palette.background,
      text: palette.text,
      divider: palette.divider,
    },

    typography,

    shape: {
      borderRadius: 8,
    },

    spacing: 8,

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },

      MuiTextField: {
        defaultProps: {
          fullWidth: true,
        },
      },
    },
  });
};
