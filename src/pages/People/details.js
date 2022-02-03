import * as React from "react";
import { useEffect } from "react";
import { Box, useTheme, Heading, SimpleGrid, HStack } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { Tag, ModalContainer } from "../../components";

export const PeopleDetails = ({ onClose, data }) => {
  const theme = useTheme();
  useEffect(() => {
    const escapeKey = "Escape";

    const keydownListener = (ev) => {
      if (ev.key !== escapeKey) return;

      onClose();
    };

    document.addEventListener("keydown", keydownListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
  }, [onClose]);

  return (
    <ModalContainer
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#000000af"
    >
      <Box
        maxW={800}
        w="90%"
        maxH={600}
        h="90%"
        p={6}
        border="1px solid white"
        borderRadius="xl"
      >
        <HStack as="header" alignItems="center" mb={6} spacing="auto">
          <Heading as="h2">{data.title}</Heading>

          <CloseIcon h={5} w={5} cursor="pointer" onClick={onClose}></CloseIcon>
        </HStack>

        <Box w="120px" h="120px" border="1px solid white" mb={6} />

        <SimpleGrid
          bg={theme.colors.darkBlue.base}
          columns={{ base: 1, md: 3 }}
          gap={8}
        >
          {data.content?.map(([key, value]) => (
            <Tag key={key} title={key} value={value} p={2} fontSize={16} />
          ))}
        </SimpleGrid>
      </Box>
    </ModalContainer>
  );
};
