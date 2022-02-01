import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => {
    return {
      body: {
        color: props.theme.colors.text,
        bg: props.theme.colors.darkBlue,
      },
    };
  },
};

const colors = {
  darkBlue: { base: "#020B1A", 600: "#0c182b" },
  lightPurple: "#7979B8",
  darkPurple: "#30303E",
  text: "#CFCDC1",
  darkGreen: "#071104"
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config, styles });
export default theme;
