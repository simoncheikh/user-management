export const getUsersApi = async (search = "") => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("No token found. Please login first.");
    }

    try {
        const res = await fetch(`/api/users?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (data.status === 401 || res.status === 401) {
            throw new Error(data.result?.message || "Session expired. Please login again.");
        }

        if (!res.ok) {
            throw new Error(data.result?.message || `Request failed with status ${res.status}`);
        }

        return data?.result?.data?.users || [];

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
