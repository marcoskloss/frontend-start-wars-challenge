import * as React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { PersonImage } from "./personImage";
import {
  Tag,
  ModalContainer,
  ModalContent,
  ModalHeader,
} from "../../components";

const ModalTag = ({ title, value }) => {
  return <Tag title={title} value={value} p={2} fontSize={16} />;
};

export const PeopleDetails = ({ onClose, data: { title, content } }) => {
  return (
    <ModalContainer onClose={onClose}>
      <ModalContent bg="#0000007a">
        <ModalHeader>
          <Heading as="h2">{title}</Heading>

          <CloseIcon h={5} w={5} cursor="pointer" onClick={onClose}></CloseIcon>
        </ModalHeader>
        <PersonImage name={title} />

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <ModalTag title="Gender" value={content.gender} />
          <ModalTag title="Height" value={`${content.height} cm`} />
          <ModalTag title="Mass" value={`${content.mass} kg`} />
          <ModalTag title="Skin color" value={content.skin_color} />
          <ModalTag title="Eye color" value={content.eye_color} />
          <ModalTag title="Hair color" value={content.hair_color} />
          <ModalTag title="Birth year" value={content.birth_year} />
        </SimpleGrid>
      </ModalContent>
    </ModalContainer>
  );
};
