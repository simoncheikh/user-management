import { useSessionStore } from '../../stores/sessionStore/sessionStore';
import { instance } from '../config';
import { AxiosError } from 'axios';

export interface EditUserPayload {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    status: "active" | "locked";
    dateOfBirth: string;
}

export const editUserApi = async ({ id, firstName, lastName, status, dateOfBirth }: EditUserPayload) => {
    const token = useSessionStore.getState().accessToken;

    try {
        const response = await instance.put(`/api/users/${id}`, {
            firstName,
            lastName,
            status,
            dateOfBirth
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("API error response:", error.response?.data);
        } else {
            console.error("Error:", error);
        }
        throw error;
    }
}
