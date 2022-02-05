import * as React from "react";
import { Box } from "@chakra-ui/react";

export const ModalContent = ({ children, ...props }) => {
  return (
    <Box
      maxW={800}
      w="90%"
      maxH={600}
      h="90%"
      p={6}
      border="1px solid white"
      borderRadius="xl"
      {...props}
    >
      {children}
    </Box>
  );
};
