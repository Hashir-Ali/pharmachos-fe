"use client";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ReactNode } from "react";

const palette = {
  primary: {
    main: "#327163",
  },
  secondary: {
    main: "#3F907D",
  },
};
const components = {
  // Name of the component
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
};

export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = createTheme({
    palette,
    components,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
