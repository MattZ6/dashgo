import { useState } from 'react';
import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue, IconButton, Spinner, Link } from '@chakra-ui/react';
import { RiAddLine, RiEditLine } from 'react-icons/ri';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';

import { useUsers, getUsers } from '../../services/hooks/useUsers';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useQueryClient } from 'react-query';
import { api } from '../../services/api';

export default function UserList({ initialUsersData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { isLoading, isFetching, error, data } = useUsers({
    page: currentPage,
    options: {
      initialData: initialUsersData
    }
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`/users/${userId}`);

      return data;
    }, {
      staleTime: 10 * 60 * 1000, // 👈 10 minutes
    });
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner size="sm" ml={4} color="gray.500" /> }
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="purple"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Novo
              </Button>
            </NextLink>
          </Flex>

          {
            isLoading ? (
              <Flex align="center" justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex align="center" justify="center">
                <Text>Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" w="8">
                        <Checkbox colorScheme="purple" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      <Th textAlign="end"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    { data.users.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="purple" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">
                              <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                {user.name}
                              </Link>
                            </Text>
                            <Text fontSize="small" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td textAlign="end">
                          <IconButton
                            aria-label="Edit user"
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            icon={<Icon as={RiEditLine} fontSize="16" />}
                          />
                        </Td>
                      </Tr>
                    )) }
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )
          }
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getUsers({ page: 1 });

  return {
    props: {
      initialUsersData: response,
    }
  }
}
