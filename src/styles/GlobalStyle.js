import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        font-family: Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    }

    #root {
        min-height: 100vh;
    }

    input {
        font-size: inherit;
        color: inherit;
    }

    button {
        color: inherit;
        cursor: pointer;
    }

`;
