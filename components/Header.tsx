import React from "react";
import { Box, Flex, Icon, Image, Link } from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";

import NextLink from "next/link";

const Header: React.FC = () => {
  return (
    <Flex
      w="100%"
      bgColor="gray.200"
      borderBottom="1px solid gray.200"
      justifyContent={"space-between"}
    >
      <Box p="1rem">
        <NextLink href="/">
          <Link>
            <Image borderRadius="full" src={`/assets/img/Header.png`} w="2rem" h="2rem" />
          </Link>
        </NextLink>
      </Box>
      <Box p="1rem">
        <NextLink href="https://github.com/HTMLhead">
          <Link>
            <Icon as={GoMarkGithub} w="2rem" h="2rem" />
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Header;
