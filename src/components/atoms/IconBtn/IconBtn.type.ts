type HtmlButtonProps=React.ButtonHTMLAttributes<HTMLButtonElement>

export interface IconButtonProps {
    img: string;               
    isDarkMode?: HtmlButtonProps['disabled'];  
    setIsDarkMode?: HtmlButtonProps['onChange']; 
    onClick?:  HtmlButtonProps['onClick']
}