export enum DropdownVariant {
    PRIMARY = "primary",
    DANGER = "danger"
}


export interface DropdownItem {
    id: number;
    label: string;
    value: string;
}

export interface DropdownProps {
    items?: DropdownItem[];
    placeholder?: string;
    onSelect?: (item: DropdownItem) => void;
    width?: string;
    variant?: DropdownVariant
    errorLabel?: string;
    value?: string
}