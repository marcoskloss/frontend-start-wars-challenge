import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
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
  const { pathname } = useLocation();

  return (
    <HStack w="100%" maxW={800} m="auto" p="3.5">
      <HStack w="100%" justify="space-between">
        <Heading>STsocial</Heading>

        <HStack as="nav" gap={8} display={{ base: "none", md: "flex" }}>
          <Link to="/">
            <NavItem hasFocus={pathname === "/"}>Characters</NavItem>
          </Link>
          <Link to="/planets">
            <NavItem hasFocus={pathname.includes("/planets")}>Planets</NavItem>
          </Link>
          <Link to="/species">
            <NavItem hasFocus={pathname.includes("/species")}>Species</NavItem>
          </Link>
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
                  <Link to="/">
                    <MenuItem>Characters</MenuItem>
                  </Link>
                  <Link to="/planets">
                    <MenuItem>Planets</MenuItem>
                  </Link>
                  <Link to="/species">
                    <MenuItem>Species</MenuItem>
                  </Link>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
      </HStack>
    </HStack>
  );
};
