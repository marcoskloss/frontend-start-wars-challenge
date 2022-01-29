import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";

export const GridList = ({ children }) => {
  return (
    <SimpleGrid rowGap={6} columnGap={4} columns={{ base: 1, md: 2 }}>
      {children}
    </SimpleGrid>
  );
};
