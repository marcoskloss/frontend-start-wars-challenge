import * as React from "react";
import { Heading, SimpleGrid, useTheme, Text } from "@chakra-ui/react";
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
      title={title}
      value={value}
      p={2}
      fontSize={16}
      bg={theme.colors.green["500"]}
    />
  );
};

const ResidentsList = ({ residents }) => (
  <>
    <Text fontSize="xl" mt={4} mb={2}>
      Residents
    </Text>
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
      {residents.map((name) => (
        <ModalTag key={name} value={name} />
      ))}
    </SimpleGrid>
  </>
);

export const PlanetDetails = ({ data: { title, content }, onClose }) => {
  return (
    <ModalContainer onClose={onClose}>
      <ModalContent bg="#0000007a">
        <ModalHeader>
          <Heading as="h2">{title}</Heading>

          <CloseIcon h={5} w={5} cursor="pointer" onClick={onClose}></CloseIcon>
        </ModalHeader>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <ModalTag title="Climate" value={content.climate} />
          <ModalTag title="Diameter" value={`${content.diameter} m`} />
          <ModalTag title="Rotation" value={`${content.rotation_period} h`} />
          <ModalTag
            title="Orbital Period"
            value={`${content.orbital_period} days`}
          />
          <ModalTag title="Gravity" value={content.gravity} />
          <ModalTag title="Terrain" value={content.terrain} />
          <ModalTag title="Population" value={content.population} />
        </SimpleGrid>

        <ResidentsList residents={content.residents} />
      </ModalContent>
    </ModalContainer>
  );
};
