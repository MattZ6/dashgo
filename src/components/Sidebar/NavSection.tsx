import { ReactNode } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';

interface NavSectionPops {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionPops) {
  return (
    <Box>
      <Text
        fontWeight="bold"
        color="gray.400"
        fontSize="small"
        textTransform="uppercase"
      >
        {title}
      </Text>

      <Stack spacing="4" mt="8" alignItems="stretch">
       {children}
      </Stack>
    </Box>
  );
}
