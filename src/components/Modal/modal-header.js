import * as React from "react";
import { HStack } from "@chakra-ui/react";

export const ModalHeader = ({ children, ...props }) => {
  return (
    <HStack as="header" alignItems="center" mb={6} spacing="auto" {...props}>
      {children}
    </HStack>
  );
};
