import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex
      alignItems="center"
    >
      <Box mr="4" textAlign="right">
        <Text>Matheus Felipe Zanin</Text>
        <Text color="gray.300" fontSize="small">
          matt_z6@hotmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Matheus Felipe Zanin" src="https://github.com/mattz6.png" />
    </Flex>
  );
}
