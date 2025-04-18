import { ActionBtn } from "../../atoms/ActionBtn/ActionBtn";
import { ActionBtnVariant } from "../../atoms/ActionBtn/ActionBtn.type";
import { userCardProps } from "./userCard.type";

export const UserCard = ({ firstName, lastName, email, status, dateofBirth, onEdit, onDelete }: userCardProps) => {
    const initials = `${(firstName?.charAt(0) || '')}${(lastName?.charAt(0) || '')}`.toUpperCase();


    return (
        <div className="flex flex-col items-center gap-[10px] w-full max-w-[100%] rounded-[5px] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] p-[30px]">
            <div className="rounded-[50px] bg-primary text-white w-[100px] h-[100px] flex items-center justify-center text-[30px]">
                {initials}
            </div>

            <div className="w-full text-left">
                <div className="text-lg font-semibold">{firstName} {lastName}</div>
                <div className="text-sm text-gray-500">Email: {email}</div>
                <div className="text-sm text-gray-500">Status: {status}</div>
                <div className="text-sm text-gray-500">Date of Birth: {dateofBirth}</div>
            </div>
            <div className="w-full text-right gap-[5px] flex justify-end">
                <ActionBtn label="Edit" variant={ActionBtnVariant.SECONDARY} paddingY="1" onClick={onEdit} />
                <ActionBtn label="Delete" variant={ActionBtnVariant.DANGER} paddingY="1" onClick={onDelete} />
            </div>
        </div>
    );
};
