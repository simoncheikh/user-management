export interface Props {
    img: string,
    isDarkMode?: boolean,
    setIsDarkMode?: (value: boolean) => void
    onClick?: () => void
}