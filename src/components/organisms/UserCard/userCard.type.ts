export interface userCardProps {
    firstName: string,
    lastName: string,
    email: string,
    status: string,
    dateofBirth: string,
    onEdit: () => void
    onDelete: () => void
}