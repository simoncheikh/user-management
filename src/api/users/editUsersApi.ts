import { showToast } from '../../components/atoms/Toast/toast';
import { useSessionStore } from '../../stores/sessionStore/sessionStore';
import { instance } from '../config';
import { AxiosError } from 'axios';

interface EditUserPayload {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: "active" | "locked";
    dateOfBirth: string;
}

export const editUserApi = async ({
    id,
    firstName,
    email,
    lastName,
    status,
    dateOfBirth
}: EditUserPayload) => {
    const token = useSessionStore.getState().accessToken;

    try {
        const response = await instance.put(`/api/users/${id}`, {
            firstName,
            email,
            lastName,
            status,
            dateOfBirth
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        showToast('User updated successfully!', 'success');
        return response.data;

    } catch (error: unknown) {
        let errorMessage = 'Failed to update user';

        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
            console.error("API error response:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }

        showToast(errorMessage, 'error');
        throw error;
    }
};