import React, { useState, forwardRef } from "react";
import { TextFieldVariant, TextfieldProps } from "./Textfield.type";
import eyeIcon from '../../../assets/view.png';

const baseClasses = `block w-full pl-3 pr-10 border py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`;

const variantClasses = {
    [TextFieldVariant.PRIMARY]: "border-gray-500",
    [TextFieldVariant.DANGER]: "border-red",
};

export const TextField = forwardRef<HTMLInputElement, TextfieldProps>(({
    name,
    placeHolder,
    errorLabel,
    variant = TextFieldVariant.PRIMARY,
    type = "text",
    ...rest 
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        name === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (
        <div className="relative max-w-md w-full">
            <input
                ref={ref}
                name={name}
                type={inputType}
                placeholder={placeHolder}
                className={`${baseClasses} ${variantClasses[variant]}`}
                {...rest} 
            />
            {name === "password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer justify-center w-8 h-full text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    <img
                        src={eyeIcon}
                        alt={showPassword ? "Hide password" : "Show password"}
                        className="h-5 w-5"
                    />
                </button>
            )}
            {variant === TextFieldVariant.DANGER && errorLabel && (
                <div className="text-red-500 text-sm mt-1">
                    {errorLabel}
                </div>
            )}
        </div>
    );
});

TextField.displayName = "TextField";
