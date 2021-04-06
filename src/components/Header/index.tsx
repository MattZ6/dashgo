import { Flex } from '@chakra-ui/react';

import { Logo } from '../Header/Logo';
import { NotificationsNav } from '../Header/NotificationsNav';
import { Profile } from '../Header/Profile';
import { Search } from '../Header/Search';

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      alignItems="center"
    >
      <Logo />

      <Search/>

      <Flex
        alignItems="center"
        ml="auto"
      >
        <NotificationsNav/>

        <Profile />
      </Flex>
    </Flex>
  );
}
