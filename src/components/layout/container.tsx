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
            status: 'active',
            email: '',
            birthDate: ''
        }
    );
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    //for validate the textfield if the field is empty or format is wrong
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.status.trim()) newErrors.status = "Status is required";

        if (!formData.birthDate.trim()) {
            newErrors.birthDate = "Birthdate is required";
        } else if (!dateRegex.test(formData.birthDate)) {
            newErrors.birthDate = "Invalid date format (YYYY-MM-DD)";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    //this function handling the Change of textfield, it takes the name as a key in textfield like firstname and the prop value is the new value of the key(name)
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

                <TextField
                    variant={errors.firstName ? "danger" : "primary"}
                    name="firstName"
                    placeHolder="First Name"
                    onChange={handleChange}
                    value={formData.firstName}
                    errorLabel={errors.firstName}
                />
                <TextField name="lastName" errorLabel={errors.lastName} variant={errors.lastName ? "danger" : "primary"} placeHolder="Last Name" onChange={handleChange} value={formData.lastName} />
                <Dropdown
                    items={[
                        { id: 1, label: 'Active', value: 'active' },
                        { id: 2, label: 'Locked', value: 'not_active' }
                    ]}
                    placeholder="Choose an option"
                    value={formData.status}
                    onSelect={(item) =>
                        handleChange({ name: "status", value: item.label })
                    }
                />
                <TextField name="email" errorLabel={errors.email} variant={errors.email ? "danger" : "primary"} placeHolder="Email" onChange={handleChange} value={formData.email} />
                <TextField name="birthDate" errorLabel={errors.birthDate} variant={errors.birthDate ? "danger" : "primary"} placeHolder="Date of Birth" onChange={handleChange} value={formData.birthDate} />

                <div className="flex flex-row gap-5 items-end justify-end">
                    <ActionBtn
                        label="Submit"
                        variant="secondary"
                        onClick={() => {
                            if (validateForm()) {
                                onSubmit(formData);
                            }
                        }}
                    />
                    <ActionBtn label="Cancel" variant="danger" onClick={cancelOnClick} />
                </div>
            </div>
        </div>
    );
};
