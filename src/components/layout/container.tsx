import { useState } from "react"
import { ActionBtn } from "../common/actionBtn"
import { TextField } from "../common/textfield"
import { Dropdown } from "../common/dropdown";

interface Props {
    cancelOnClick: () => void;
    onSubmit: (userData: {
        firstName: string;
        lastName: string;
        status: string;
        email: string;
        birthDate: string;
    }) => void;
    initialValues?: {
        firstName: string;
        lastName: string;
        status: string;
        email: string;
        birthDate: string;
    };
    label?: string;
}

export const Container = ({ cancelOnClick, onSubmit, initialValues, label = "Create New User" }: Props) => {
    const [formData, setFormData] = useState(
        initialValues || {
            firstName: '',
            lastName: '',
            status: '',
            email: '',
            birthDate: ''
        }
    );

    const handleChange = ({ name, value }: { name: string; value: string }) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col gap-5 rounded-[20px] bg-white/98 z-50 p-8 border border-primary shadow-xl max-w-md w-full">
                <div className='text-[30px]'>{label}</div>

                <TextField name="firstName" placeHolder="First Name" onChange={handleChange} value={formData.firstName} />
                <TextField name="lastName" placeHolder="Last Name" onChange={handleChange} value={formData.lastName} />
                <Dropdown
                    items={[
                        { id: 1, label: 'Active', value: 'active' },
                        { id: 2, label: 'Not Active', value: 'not_active' }
                    ]}
                    placeholder="Choose an option"
                    value={formData.status}
                    onSelect={(item) =>
                        handleChange({ name: "status", value: item.label })
                    }
                    errorLabel="This field is required"
                />
                <TextField name="email" placeHolder="Email" onChange={handleChange} value={formData.email} />
                <TextField name="birthDate" placeHolder="Date of Birth" onChange={handleChange} value={formData.birthDate} />

                <div className="flex flex-row gap-5 items-end justify-end">
                    <ActionBtn label="Submit" variant="secondary" onClick={() => onSubmit(formData)} />
                    <ActionBtn label="Cancel" variant="danger" onClick={cancelOnClick} />
                </div>
            </div>
        </div>
    );
};
