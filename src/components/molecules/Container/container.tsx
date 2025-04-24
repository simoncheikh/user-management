import { useState } from "react"
import { ActionBtn } from "../../atoms/ActionBtn/ActionBtn"
import { TextField } from "../../atoms/Textfield/Textfield"
import { Dropdown } from "../../atoms/Dropdown/Dropdown";
import { TextFieldVariant } from "../../atoms/Textfield";
import { ActionBtnVariant } from "../../atoms/ActionBtn/ActionBtn.type";
import { ContainerProps } from "./Container.type";

export const Container = ({ cancelOnClick, onSubmit, initialValues, label = "Add New User" }: ContainerProps) => {
    const [formData, setFormData] = useState(
        initialValues || {
            firstName: '',
            lastName: '',
            status: 'active',
            email: '',
            dateOfBirth: ''
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

        if (!formData.dateOfBirth.trim()) {
            newErrors.dateOfBirth = "Birthdate is required";
        } else if (!dateRegex.test(formData.dateOfBirth)) {
            newErrors.dateOfBirth = "Invalid date format (YYYY-MM-DD)";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    //this function handling the Change of textfield, it takes the name as a key in textfield like firstname and the prop value is the new value of the key(name)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
        if ('name' in event) {
            const { name, value } = event;
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            // This is the ChangeEvent from TextField input
            const { name, value } = event.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col gap-5 bg-white/98 z-50 p-8 rounded-[5px] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] max-w-md w-full">
                <div className='text-[30px] flex justify-center'>{label}</div>

                <TextField
                    variant={errors.firstName ? TextFieldVariant.DANGER : TextFieldVariant.PRIMARY}
                    name="firstName"
                    placeHolder="First Name"
                    onChange={handleChange}
                    value={formData.firstName}
                    errorLabel={errors.firstName}
                />
                <TextField name="lastName" errorLabel={errors.lastName} variant={errors.lastName ? TextFieldVariant.DANGER : TextFieldVariant.PRIMARY} placeHolder="Last Name" onChange={handleChange} value={formData.lastName} />
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
                <TextField name="email" errorLabel={errors.email} variant={errors.email ? TextFieldVariant.DANGER : TextFieldVariant.PRIMARY} placeHolder="Email" onChange={handleChange} value={formData.email} />
                <TextField name="dateOfBirth" errorLabel={errors.dateOfBirth} variant={errors.dateOfBirth ? TextFieldVariant.DANGER : TextFieldVariant.PRIMARY} placeHolder="Date of Birth" onChange={handleChange} value={formData.dateOfBirth} />

                <div className="flex flex-row gap-5 items-center justify-center">
                    <ActionBtn
                        label="Submit"
                        variant={ActionBtnVariant.SECONDARY}
                        onClick={() => {
                            if (validateForm()) {
                                onSubmit(formData);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
