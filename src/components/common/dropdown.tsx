import { useState, useRef, useEffect } from 'react';
import downIcon from '../../assets/down.png';

interface DropdownItem {
    id: number;
    label: string;
    value: string;
}

interface DropdownProps {
    items?: DropdownItem[];
    placeholder?: string;
    onSelect?: (item: DropdownItem) => void;
    width?: string;
    variant?: 'primary' | 'danger';
    errorLabel?: string;
    value?: string
}

export const Dropdown = ({
    items = [],
    placeholder = "Select an option",
    onSelect,
    width = 'w-full',
    variant,
    errorLabel, value
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value && items.length > 0) {
            const matchedItem = items.find(item => item.value === value);
            if (matchedItem) {
                setSelectedItem(matchedItem);
            }
        }
    }, [value, items]);

    const handleItemClick = (item: DropdownItem) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onSelect) onSelect(item);
    };

    return (
        <div className={`relative ${width} max-w-md`} ref={dropdownRef}>
            {/* Dropdown header */}
            <div
                className={`flex items-center justify-between p-2 bg-white border-2 rounded-lg cursor-pointer transition-all h-12 text-gray-500
          ${variant === 'danger' ? 'border-red-500' : 'border-gray-300 hover:border-gray-500'}
          ${isOpen ? 'border-gray-500 shadow-md' : ''}
        `}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItem ? selectedItem.label : placeholder}
                <img className="w-5" src={downIcon} alt="dropdown arrow" />
            </div>

            {/*Dropdown list*/}
            {isOpen && (
                <div className="absolute w-full max-h-48 overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`p-3 cursor-pointer transition-colors hover:bg-gray-100
                ${selectedItem?.id === item.id ? 'bg-blue-50 text-blue-600' : ''}
              `}
                            onClick={() => handleItemClick(item)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}

            {/* Error label */}
            {variant === "danger" && (
                <div className="text-red-500">{errorLabel}</div>
            )}
        </div>
    );
};