import * as React from "react";
import { Box, Heading, SimpleGrid, useTheme, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import {
  Tag,
  ModalContainer,
  ModalContent,
  ModalHeader,
} from "../../components";

const ModalTag = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Tag
      bg={theme.colors.pink["400"]}
      title={title}
      value={value}
      p={2}
      fontSize={16}
    />
  );
};

const PeopleList = ({ people }) => (
  <>
    <Text fontSize="xl" mt={4} mb={2}>
      People
    </Text>
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
      {people.map((name) => (
        <ModalTag key={name} value={name} />
      ))}
    </SimpleGrid>
  </>
);

export const SpeciesDetails = ({ onClose, data: { title, content } }) => {
  return (
    <ModalContainer onClose={onClose}>
      <ModalContent bg="#0000007a">
        <ModalHeader>
          <Heading as="h2">{title}</Heading>

          <CloseIcon h={5} w={5} cursor="pointer" onClick={onClose}></CloseIcon>
        </ModalHeader>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <ModalTag title="Classification" value={content.classification} />
          <ModalTag title="Designation" value={content.designation} />
          <ModalTag
            title="Average Height"
            value={`${content.average_height} cm`}
          />
          <ModalTag title="Skin Colors" value={content.skin_colors} />
          <ModalTag title="Hair Colors" value={content.hair_colors} />
          <ModalTag
            title="Average Expectancy"
            value={`${content.average_lifespan} years`}
          />
          <ModalTag title="Language" value={content.language} />
        </SimpleGrid>

        <PeopleList people={content.people} />
      </ModalContent>
    </ModalContainer>
  );
};
