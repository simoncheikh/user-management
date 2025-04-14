export interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
    CreateOnClick: () => void;
    setIsDarkMode: (value: boolean) => void;
    isDarkMode: boolean;
}
