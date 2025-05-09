import React from "react";
import { ActionBtnVariant, ActionBtnProps } from "./ActionBtn.type";


export const ActionBtn: React.FC<ActionBtnProps> = React.memo(({ label, variant, onClick, paddingY, width, type, disabled }) => {
    const baseClasses = `w-${width} py-${paddingY} p-[10px] rounded-[5px] text-[15px] font-semibold cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 transition-colors duration-200`;
    const variantClasses = {
        [ActionBtnVariant.PRIMARY]: `
          bg-white 
          text-primary 
          border border-gray-200 
          hover:bg-gray-200 
          hover:border-gray-300 
          active:bg-gray-100
        `,
        [ActionBtnVariant.SECONDARY]: `
         bg-primary
         text-white
         hover:bg-primary-darker
        `,
        [ActionBtnVariant.DANGER]: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick} type={type} disabled={disabled}>
            {label}
        </button>
    );
});