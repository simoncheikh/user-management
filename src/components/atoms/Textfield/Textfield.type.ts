export enum TextFieldVariant {
    PRIMARY = "primary",
    DANGER = "danger"
}

type HtmlTextfieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface TextfieldProps {
    onChange?: HtmlTextfieldProps['onChange'];
    placeHolder?: HtmlTextfieldProps['placeholder']
    variant: TextFieldVariant
    value?: HtmlTextfieldProps['value']
    errorLabel?: String
    name?: string
    type?: HtmlTextfieldProps['type']
}