import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { ActionBtn } from "../../../components/atoms/ActionBtn/ActionBtn";
import { TextField } from "../../../components/atoms/Textfield/Textfield";
import { Dropdown } from "../../../components/atoms/Dropdown/Dropdown";
import { TextFieldVariant } from "../../../components/atoms/Textfield";
import { ActionBtnVariant } from "../../../components/atoms/ActionBtn/ActionBtn.type";
import { ManageUserProps } from "./ManageForm.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import dayjs from "dayjs";
import { createUsersApi } from "../../../api/users/createUsersApi";
import { editUserApi } from "../../../api/users/editUsersApi";
import { LoadingPage } from "../Loading/LoadingPage";



const schema = z
    .object({
        firstName: z.string().trim().min(1, "First Name is required"),
        lastName: z.string().trim().min(1, "Last Name is required"),
        email: z.string().email("Email is invalid"),
        status: z.enum(["active", "locked"], {
            errorMap: () => ({ message: "Status is required" }),
        }),
        dateOfBirth: z.string()
            .min(1, "Date of birth is required")
            .refine(date => {
                const parsedDate = new Date(date);
                return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
            }, {
                message: "Date of birth cannot be in the future",
            })
            .refine(date => {
                const parsedDate = new Date(date);
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 120);
                return parsedDate >= minDate;
            }, {
                message: "Age must be less than 120 years",
            })
    })

type FormData = z.infer<typeof schema>;



export const ManageForm = ({ user, isEdited }: ManageUserProps) => {

    const location = useLocation()
    const { userId, value } = location.state || {}
    const queryClient = useQueryClient()
    const navigate = useNavigate();


    const createUsersMutation = useMutation({
        mutationFn: createUsersApi,
        onSuccess,
    });

    const editUsersMutation = useMutation({
        mutationFn: editUserApi,
        onSuccess,
    })

    function onSuccess() {
        navigate("/dashboard");

        queryClient.invalidateQueries({ queryKey: ["users"] });

        if (user?.id) {
            queryClient.invalidateQueries({ queryKey: ["users", user.id] });
        }
    }

    const defaultValues = value ? {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        status: value.status as "active" | "locked",
        dateOfBirth: value?.dateOfBirth
            ? new Date(value.dateOfBirth).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
    } : {};

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, isSubmitting, isLoading },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues,
    });
    const {
        field: statusField
    } = useController({
        control,
        name: "status"
    });


    const onSubmit = useCallback(({ firstName, lastName, email, status, dateOfBirth }: FormData) => {
        if (isEdited == true) {
            return editUsersMutation.mutate({
                id: userId,
                firstName,
                lastName,
                email,
                status,
                dateOfBirth: dayjs(dateOfBirth).format("YYYY-MM-DD"),
            });
        }
        return createUsersMutation.mutate({
            firstName,
            lastName,
            email,
            status,
            dateOfBirth: dayjs(dateOfBirth).format("YYYY-MM-DD"),
        });
    }, [isEdited, createUsersMutation, editUsersMutation]);

    const isSubmittingForm = createUsersMutation.isPending || editUsersMutation.isPending;

    if (isSubmittingForm) {
        return <LoadingPage label={isEdited ? "Updating User..." : "Creating User..."} />;
    }

    return (
        <form className="inset-0 flex items-center min-h-[90vh] justify-center z-50 dark:bg-dark" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 bg-white/98 z-50 p-8 rounded-[5px] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] max-w-md w-full">
                <div className='text-[30px] flex justify-center'>{isEdited == true ? "Update User" : "Add New User"}</div>

                {/* First Name */}
                <div>
                    <label className="font-medium text-gray-500">First Name</label>
                    <TextField
                        {...register("firstName")}
                        variant={TextFieldVariant.PRIMARY}
                        type="text"
                        errorLabel={errors.firstName?.message} />
                    {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                    )}
                </div>


                {/* Last Name */}
                <div>
                    <label className="block mb-1 font-medium text-gray-500">Last Name</label>
                    <TextField
                        {...register("lastName")}
                        variant={TextFieldVariant.PRIMARY}
                        type="text"
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium text-gray-500">Email</label>
                    <TextField
                        {...register("email")}
                        type="email"
                        variant={TextFieldVariant.PRIMARY}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>


                {/* Date of Birth */}
                <div>
                    <label className="block mb-1 font-medium text-gray-500">Date of Birth</label>
                    <TextField
                        {...register("dateOfBirth")}
                        variant={TextFieldVariant.PRIMARY}
                        type="date"
                        errorLabel={errors.dateOfBirth?.message} />
                    {errors.dateOfBirth && (
                        <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                {/* Status Dropdown */}
                <div>
                    <label className="block mb-1 font-medium text-gray-500">Status</label>
                    <Dropdown
                        {...statusField}
                        items={[
                            { id: 1, label: 'Active', value: 'active' },
                            { id: 2, label: 'Locked', value: 'locked' }
                        ]}
                        placeholder="Choose an option"
                        errorLabel={errors.status?.message}
                    />
                    {errors.status && (
                        <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex flex-row gap-5 items-center justify-center">
                    <ActionBtn
                        label="Submit"
                        variant={ActionBtnVariant.SECONDARY}
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    />
                </div>
            </div>
        </form >
    );
};
