export enum DropdownVariant {
    PRIMARY = "primary",
    DANGER = "danger"
}


export interface DropdownItem {
    id: number;
    label: string;
    value: string;
}

export type DropdownProps = {
    items: DropdownItem[];
    placeholder?: string;
    value?: string; 
    onChange?: (value: string) => void; 
    onBlur?: () => void;
    name?: string;
    errorLabel?: string;
    variant?: DropdownVariant;
    width?: string;
    onSelect?: (item: DropdownItem) => void; // optional external handler
  };
  