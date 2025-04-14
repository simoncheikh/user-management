export enum ActionBtnVariant {
    PRIMARY = "primary",
    DANGER = "danger",
    SECONDARY = "secondary"
}

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ActionBtnProps {
    onClick?: HtmlButtonProps['onClick'];
    label: string;
    variant: ActionBtnVariant;
    name?: HtmlButtonProps['name'];
    type?: HtmlButtonProps['type'];
    disabled?: HtmlButtonProps['disabled'];
    width?: string;
    paddingY?: string;
}

