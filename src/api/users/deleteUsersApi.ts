import { useSessionStore } from '../../stores/sessionStore/sessionStore';
import { instance } from '../config'; // your Axios instance

export const deleteUser = async ({ id }: { id: string }) => {
    const token = useSessionStore.getState().accessToken;

    return instance.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
