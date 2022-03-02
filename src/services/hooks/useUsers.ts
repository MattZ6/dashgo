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

export async function getUsers() {
  const { data } = await api.get<Response>('/users');

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

  return users;
}

export function useUsers() {
  return useQuery(['users'], getUsers, {
    staleTime: 5 * 1000, // 👈 5 seconds
  });
}
