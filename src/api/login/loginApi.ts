export const loginApi = async ({ email, password }: { email: string; password: string }) => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Invalid credentials');
    }

    const data = await res.json();
    return data.result.data;
};