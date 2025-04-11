
import React from "react";
import { TextFieldVariant, TextfieldProps } from "./Textfield.type";

const baseClasses = `block w-full pl-3 pr-3 border py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`

const variantClasses = {
    [TextFieldVariant.PRIMARY]: "border-gray-500",
    [TextFieldVariant.DANGER]: "border-red"
}

export const TextField: React.FC<TextfieldProps> = React.memo(({ name, placeHolder, errorLabel, onChange, value, variant }) => {

    return (
        <div className="relative max-w-md w-full">
            <input
                name={name}
                type="text"
                value={value}
                placeholder={placeHolder}
                onChange={onChange}
                className={`${baseClasses} ${variantClasses[variant]}`}
            />
            {variant == TextFieldVariant.DANGER &&
                <div className="text-red-500">
                    {errorLabel}
                </div>}
        </div>
    );
});
