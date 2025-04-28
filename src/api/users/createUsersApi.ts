import { useSessionStore } from '../../stores/sessionStore/sessionStore';
import { instance } from '../config';
import { showToast } from '../../components/atoms/Toast/toast';

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "locked";
  dateOfBirth: string;
}

export const createUsersApi = async (data: CreateUserPayload): Promise<void> => {
  const token = useSessionStore.getState().accessToken;

  try {
    const response = await instance.post("/api/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    showToast('User created successfully!', 'success');
    return response.data;
  } catch (error: any) {
    showToast(
      error.response?.data?.message || 'Failed to create user',
      'error'
    );
    throw error;
  }
};