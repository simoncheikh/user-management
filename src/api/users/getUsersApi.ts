import axios from 'axios';
import { useSessionStore } from '../../stores/sessionStore/sessionStore';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "locked";
  dateOfBirth: string;
}

export const getUsersApi = async (): Promise<User[]> => {
  const token = useSessionStore.getState().accessToken;

  const response = await axios.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.result?.data?.users;
};
