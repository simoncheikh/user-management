type HtmlTextfieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface SearchFieldProps {
    onSearchChange: HtmlTextfieldProps['onChange'];
}
