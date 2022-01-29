import { HStack } from "@chakra-ui/react";

export const TagsContainer = ({ children }) => (
  <HStack gap={1} mt={3}>
    {children}
  </HStack>
);
