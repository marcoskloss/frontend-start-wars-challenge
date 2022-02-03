import styled from "styled";
import { Box } from "@chakra-ui/react";

export const ModalContainer = styled(Box)`
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
