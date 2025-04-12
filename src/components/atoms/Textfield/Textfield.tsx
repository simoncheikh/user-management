import React, { useState } from "react";
import { TextFieldVariant, TextfieldProps } from "./Textfield.type";

import eyeIcon from '../../../assets/view.png'


const baseClasses = `block w-full pl-3 pr-10 border py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`;

const variantClasses = {
    [TextFieldVariant.PRIMARY]: "border-gray-500",
    [TextFieldVariant.DANGER]: "border-red"
};

export const TextField: React.FC<TextfieldProps> = React.memo(({ name, placeHolder, errorLabel, onChange, value, variant }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative max-w-md w-full">
            <input
                name={name}
                type={name == "password" ? (showPassword ? "text" : "password") : "text"}
                value={value}
                placeholder={placeHolder}
                onChange={onChange}
                className={`${baseClasses} ${variantClasses[variant]}`}
            />
            {name == "password" && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
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
            {variant === TextFieldVariant.DANGER && (
                <div className="text-red-500">
                    {errorLabel}
                </div>
            )}
        </div>
    );
});