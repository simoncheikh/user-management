import { useSessionStore } from '../../stores/sessionStore/sessionStore';
import { instance } from '../config';
import { showToast } from '../../components/atoms/Toast/toast';

export const deleteUser = async ({ id }: { id: string }) => {
    const token = useSessionStore.getState().accessToken;

    try {
        const response = await instance.delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        showToast('User deleted successfully!', 'success');
        return response.data;
    } catch (error: any) {
        showToast(
            error.response?.data?.message || 'Failed to delete user',
            'error'
        );
        throw error;
    }
};