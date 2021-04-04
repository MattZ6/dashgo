import { Button, Stack, Box } from '@chakra-ui/react';

export function Pagination() {
  return (
    <Stack
      direction="row"
      mt="8"
      justifyContent="space-between"
      alignItems="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <Stack direction="row" spacing="2">
        <Button
          size="sm"
          fontSize="xl"
          width="4"
          colorScheme="purple"
          disabled
          _disabled={{
            cursor: 'default'
          }}
        >
          1
        </Button>

        <Button
          size="sm"
          fontSize="xl"
          width="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500'
          }}
        >
          2
        </Button>

        <Button
          size="sm"
          fontSize="xl"
          width="4"
          bg="gray.700"
          _hover={{
            bg: 'gray.500'
          }}
        >
          3
        </Button>
      </Stack>
    </Stack>
  );
}
