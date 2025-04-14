import React from "react";
import { IconButtonProps } from "./IconBtn.type";

export const IconBtn: React.FC<IconButtonProps> = React.memo(({ img, onClick }) => {

    return (
        <button
            onClick={onClick}
            className="p-2 rounded-full cursor-pointer"
        >
            <img
                className="h-6 w-6 text-yellow-400"
                src={img}
            />
        </button>
    );
});