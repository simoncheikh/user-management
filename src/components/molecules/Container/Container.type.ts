export interface ContainerProps {
    cancelOnClick: () => void;
    onSubmit: (userData: {
        firstName: string;
        lastName: string;
        status: string;
        email: string;
        dateOfBirth: string;
    }) => void;
    initialValues?: {
        firstName: string;
        lastName: string;
        status: string;
        email: string;
        dateOfBirth: string;
    };
    label?: string;
}