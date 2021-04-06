import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text
      fontSize="3xl"
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      DashGO
      <Text as="span" color="purple.500" ml={1}>.</Text>
    </Text>
  );
}
