import * as React from "react";
import { Tag as ChakraTag, useTheme } from "@chakra-ui/react";

export const Tag = ({ title, value }) => {
  const theme = useTheme();

  return (
    <ChakraTag size="sm" bg={theme.colors.lightPurple} p={1}>
      {title}: {value}
    </ChakraTag>
  );
};
