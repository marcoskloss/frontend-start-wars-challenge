import * as React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { GlobalStyle } from "./styles/GlobalStyle";
import { App } from "./pages/App";
import { ListContextProvider } from "./context/listContext";
import theme from "./styles/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ListContextProvider>
        <App />
      </ListContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
