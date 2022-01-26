import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => {
    return {
      body: {
        color: "#CFCDC1",
        bg: props.theme.colors.darkBlue,
      },
    };
  },
};

const colors = {
  darkBlue: "#020B1A",
  lightPurple: "#7979B8",
  darkPurple: "#30303E",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config, styles });
export default theme;
