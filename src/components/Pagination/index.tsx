import { Stack, Box, Text } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

type Props = {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    });
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: Props) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
    : [];

  const nextsPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + SIBLINGS_COUNT, lastPage))
    : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justifyContent="space-between"
      alignItems="center"
      spacing="6"
    >
      <Box>
        <strong>{currentPage}</strong> - <strong>{lastPage}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">

        { currentPage > (1 + SIBLINGS_COUNT) && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />

            { currentPage > (2 + SIBLINGS_COUNT) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            ) }
          </>
        ) }

        { previousPages.length && previousPages.map(page => (
          <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        )) }

        <PaginationItem number={currentPage} isCurrent />

        { nextsPages.length && nextsPages.map(page => (
          <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        )) }

        { currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            { currentPage + 1 + SIBLINGS_COUNT < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            ) }

            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        ) }

      </Stack>
    </Stack>
  );
}
