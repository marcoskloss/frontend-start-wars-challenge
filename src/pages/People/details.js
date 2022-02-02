import * as React from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";

const ModalContainer = styled(Box)`
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const PeopleDetails = () => {
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
        border="1px solid white"
        borderRadius="xl"
      />
    </ModalContainer>
  );
};
