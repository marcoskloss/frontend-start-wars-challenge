import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";

export const SModalContainer = styled(Box)`
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = ({ children, onClose, ...props }) => {
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

  return <SModalContainer {...props}>{children}</SModalContainer>;
};
