interface Props {
    name: string;
    placeHolder: string;
    onChange: (e: { name: string; value: string }) => void;
    value?: string;
    variant: "primary" | "danger",
    errorLabel?: string
}

export const TextField = ({ name, placeHolder, errorLabel, onChange, value, variant }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ name, value: e.target.value });
    };

    const baseClasses = `block w-full pl-3 pr-3 py-2 border rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out`

    const variantClasses = {
        primary: `
        border-gray-300
        `,
        danger: `
        border-red
        `
    }

    return (
        <div className="relative max-w-md w-full">
            <input
                name={name}
                type="text"
                value={value}
                placeholder={placeHolder}
                onChange={handleChange}
                className={`${baseClasses} ${variantClasses[variant]}`}
            />
            {variant == "danger" &&
                <div className="text-red-500">
                    {errorLabel}
                </div>}
        </div>
    );
};
