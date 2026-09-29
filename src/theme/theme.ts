import { createTheme } from "@mui/material/styles";

import { colors } from "./colors";
import { typography } from "./typography";

export const themeModes = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export type TThemeMode = (typeof themeModes)[keyof typeof themeModes];

export type TResolvedThemeMode = "light" | "dark";

export const createAppTheme = (mode: TResolvedThemeMode) => {
  const palette = colors[mode];

  return createTheme({
    cssVariables: true,

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
          html: {
            boxSizing: "border-box",
          },

          "*": {
            boxSizing: "inherit",
          },

          "*::before": {
            boxSizing: "inherit",
          },

          "*::after": {
            boxSizing: "inherit",
          },

          body: {
            margin: 0,
            backgroundColor: palette.background.default,
          },

          "#root": {
            minHeight: "100vh",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          fullWidth: true,
        },
      },

      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },

        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "12px 16px",
          },

          head: {
            fontWeight: 600,
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            margin: "2px 4px",
          },
        },
      },
    },
  });
};
