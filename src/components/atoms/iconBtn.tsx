import { useState } from 'react';


interface Props {
    img: string,
    isDarkMode?: boolean,
    setIsDarkMode?: (value: boolean) => void
    onClick?: () => void
}

export const IconBtn = ({ img, isDarkMode = false, setIsDarkMode, onClick }: Props) => {

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
};