import * as React from "react";
import { HStack, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <HStack w="100%" maxW={800} bg="red.200" m="auto" p="3.5">
      <HStack gap={32}>
        <Text>Social Media for Star Wars</Text>

        <HStack gap={8}>
          <Text>Characters</Text>
          <Text>Planets</Text>
          <Text>Species</Text>
        </HStack>
      </HStack>
    </HStack>
  );
};
