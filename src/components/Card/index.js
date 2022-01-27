import * as React from "react";
import { Box } from "@chakra-ui/react";

export const Card = ({ children, ...props }) => (
  <Box rounded="md" px={8} py={4} cursor="pointer" {...props}>
    {children}
  </Box>
);
