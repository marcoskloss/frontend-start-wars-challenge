import { Box, useTheme } from "@chakra-ui/react";
import { Header } from "../Header";

export const Layout = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Box w="100%" minH="100vh" bg={theme.colors.darkBlue.base} {...props}>
      <Box maxW={800} w="100%" m="auto">
        <Header />

        <Box as="main" padding={{ base: 2, lg: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
