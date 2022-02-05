import * as React from "react";
import { Box, useTheme, Heading, SimpleGrid } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import {
  Tag,
  ModalContainer,
  ModalContent,
  ModalHeader,
} from "../../components";

export const PeopleDetails = ({ onClose, data }) => {
  const theme = useTheme();

  return (
    <ModalContainer bg="#000000af" onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <Heading as="h2">{data.title}</Heading>

          <CloseIcon h={5} w={5} cursor="pointer" onClick={onClose}></CloseIcon>
        </ModalHeader>

        <Box w="120px" h="120px" border="1px solid white" mb={6} />

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          {data.content?.map(([key, value]) => (
            <Tag key={key} title={key} value={value} p={2} fontSize={16} />
          ))}
        </SimpleGrid>
      </ModalContent>
    </ModalContainer>
  );
};
