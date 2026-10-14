import { extendTheme, ThemeConfig, StyleFunctionProps } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: props.colorMode === "dark" ? "#212121" : "light",
      color: props.colorMode === "dark" ? "light" : "gray.800",
    },
  }),
};

export const theme = extendTheme({ config, styles });
