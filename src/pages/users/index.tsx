import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue, IconButton, Spinner } from '@chakra-ui/react';
import { RiAddLine, RiEditLine } from 'react-icons/ri';
import Link from 'next/link';
import { useQuery } from 'react-query';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

async function fetcher() {
  const { data } = await api.get('/users');

  const users = data.users.map((user, index) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    isChecked: index === 4,
  }));

  return users;
}

export default function UserList() {
  const { isLoading, isFetching, error, data } = useQuery(['users'], fetcher, {
    staleTime: 5 * 1000, // 👈 5 seconds
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="purple"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                Novo
              </Button>
            </Link>
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
                        <Checkbox
                          colorScheme="purple"
                          isChecked={data.every(user => user.isChecked)}
                          isIndeterminate={data.some(user => user.isChecked)}
                        />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      <Th textAlign="end"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    { data.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="purple" isChecked={user.isChecked} />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
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

                <Pagination />
              </>
            )
          }
        </Box>
      </Flex>
    </Box>
  );
}
