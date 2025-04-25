import { userData } from "../../../pages/userManagement/userManagement.type";


export interface ManageUserProps {
    user?: userData | null
    isEdited?: boolean
}