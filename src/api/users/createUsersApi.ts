import { useSessionStore } from '../../stores/sessionStore/sessionStore';
import { instance } from '../config';

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "locked";
  dateOfBirth: string;
}

export const createUsersApi = async (data: CreateUserPayload): Promise<void> => {
  const token = useSessionStore.getState().accessToken

  const response = await instance.post("/api/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
