import * as React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { GlobalStyle } from "./styles/GlobalStyle";
import { App } from "./pages/App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalStyle />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
