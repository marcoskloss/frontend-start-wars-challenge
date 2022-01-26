import * as React from "react";
import { Box } from "@chakra-ui/react";

export const Card = ({ children }) => (
  <Box bg="red.200" rounded="md" px={8} py={4} cursor="pointer">
    {children}
  </Box>
);
