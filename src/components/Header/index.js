import * as React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";
import { NavItem } from "../NavItem";

export const Header = () => {
  return (
    <HStack w="100%" maxW={800} m="auto" p="3.5">
      <HStack w="100%" justify="space-between">
        <Heading>STsocial</Heading>

        <HStack as="nav" gap={8} display={{ base: "none", md: "flex" }}>
          <NavItem hasFocus>Characters</NavItem>
          <NavItem>Planets</NavItem>
          <NavItem>Species</NavItem>
        </HStack>

        <Box display={{ base: "inline-block", md: "none" }}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  icon={<HamburgerIcon />}
                />
                <MenuList>
                  <MenuItem>Characters</MenuItem>
                  <MenuItem>Planets</MenuItem>
                  <MenuItem>Species</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </HStack>
    </HStack>
  );
};
