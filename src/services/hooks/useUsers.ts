import { useQuery } from 'react-query';

import { api } from '../api';

type Response = {
  users: User[];
}

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type Request = {
  page: number;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers({ page }: Request) {
  const { data, headers } = await api.get<Response>('/users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count'] ?? 0);

  const users = data.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }));

  return {
    totalCount,
    users
  } as GetUsersResponse;
}

type Props = {
  page: number;
}

export function useUsers({ page }: Props) {
  return useQuery(['users', page], () => getUsers({ page }), {
    staleTime: 10 * 1000, // 👈 10 seconds
  });
}
