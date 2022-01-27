import { useTheme } from "@chakra-ui/react";
import styled from "styled-components";

const SNavItem = styled.div`
  ${(props) =>
    props.hasFocus ? `border-bottom: 1px solid ${props.color};` : ""}

  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    outline: ${(props) => `1px solid ${props.color}`};
    ${(props) => props.hasFocus && "border-bottom: 1px solid transparent;"}
  }
`;

export const NavItem = ({ hasFocus, children }) => {
  const { colors } = useTheme();

  return (
    <SNavItem hasFocus={hasFocus} color={colors.text} bg={colors.darkBlue}>
      <span>{children}</span>
    </SNavItem>
  );
};
